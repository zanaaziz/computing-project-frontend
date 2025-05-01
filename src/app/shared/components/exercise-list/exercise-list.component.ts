import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from './comments/comments.component';
import { AddListItemComponent } from './add-list-item/add-list-item.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-exercise-list',
	standalone: false,
	templateUrl: './exercise-list.component.html',
	styleUrl: './exercise-list.component.scss',
})
export class ExerciseListComponent implements OnInit {
	@Input() list: any[]; // used when exercises from a custom user list is passed
	exercises = [];
	queryParams = {};
	currentPage: number = 1;
	total: number = 0;
	isLoading: boolean = false;
	hasMore: boolean = true;
	aiResult: Object;

	constructor(
		private apiService: ApiService,
		private route: ActivatedRoute,
		public authService: AuthService,
		private dialog: MatDialog,
		private snack: MatSnackBar
	) {}

	ngOnInit(): void {
		if (this.list) {
			this.exercises = this.list['list']['exercises'];
		} else {
			this.route.queryParams.subscribe((queryParams) => {
				this.queryParams = { ...queryParams };
				this.currentPage = 1;
				this.exercises = [];
				this.hasMore = true;
				this.getExercises(this.currentPage);
			});
		}
	}

	getExercises(page: number) {
		if (this.isLoading) return;

		this.isLoading = true;
		const params = { ...this.queryParams, page: page.toString() };

		this.apiService.get('/exercises', { params }).subscribe({
			next: (response) => {
				if (page === 1) {
					this.exercises = response.data;
				} else {
					this.exercises = [...this.exercises, ...response.data];
				}
				this.currentPage = page;
				this.total = response.total;
				this.hasMore = this.exercises.length < this.total;

				if (response['ai']) {
					this.aiResult = response['ai'];
				}

				this.isLoading = false;
			},
			error: (error) => {
				console.error('Error fetching exercises:', error);
				this.isLoading = false;
			},
			complete() {
				this.isLoading = false;
			},
		});
	}

	onLike(exercise: Object) {
		if (!exercise['isLiked']) {
			this.apiService.post('/likes', { exerciseId: exercise['exerciseId'] }).subscribe({
				next: (response) => {
					exercise['isLiked'] = !exercise['isLiked'];
					exercise['likeCount'] += 1;
				},
				error: (error) => {
					console.error('Error liking exercise:', error);
				},
				complete() {
					//
				},
			});
		} else {
			this.apiService.delete('/likes', { params: { exerciseId: exercise['exerciseId'] } }).subscribe({
				next: (response) => {
					exercise['isLiked'] = !exercise['isLiked'];
					exercise['likeCount'] -= 1;
				},
				error: (error) => {
					console.error('Error liking exercise:', error);
				},
				complete() {
					//
				},
			});
		}
	}

	onComment(exercise: Object) {
		const dialogRef = this.dialog.open(CommentsComponent, {
			width: '500px',
			maxWidth: '90vw',
			height: '400px',
			maxHeight: '90vh',
			data: { exercise: exercise },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result !== undefined) {
				//
			}
		});
	}

	onAddToList(exercise: Object) {
		const dialogRef = this.dialog.open(AddListItemComponent, {
			width: '500px',
			maxWidth: '90vw',
			height: '315px',
			maxHeight: '90vh',
			data: { exercise: exercise },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result && result.added) {
				this.snack.open('Exercise added to list', null, {
					duration: 5000,
				});
			}
		});
	}

	onRemoveExerciseFromList(exercise: Object) {
		this.apiService.delete(`/lists/${this.list['list']['listId']}/exercises`, { params: { exerciseId: exercise['exerciseId'] } }).subscribe({
			next: (response) => {
				// delete the exercise from the stored arrays
				this.list['list']['exercises'] = this.list['list']['exercises'].filter((item) => item !== exercise);
				this.exercises = this.exercises.filter((item) => item !== exercise);

				this.snack.open('Exercise removed from list', null, {
					duration: 5000,
				});
			},
			error: (error) => {
				this.snack.open('Failed to remove', null, {
					duration: 5000,
				});
			},
		});
	}

	@HostListener('window:scroll', ['$event'])
	onScroll(event: Event) {
		if (this.list) {
			return;
		}

		const scrollPosition = window.pageYOffset;
		const windowHeight = window.innerHeight;
		const bodyHeight = document.body.scrollHeight;

		if (scrollPosition + windowHeight >= bodyHeight - 100) {
			if (!this.isLoading && this.hasMore) {
				this.getExercises(this.currentPage + 1);
			}
		}
	}
}
