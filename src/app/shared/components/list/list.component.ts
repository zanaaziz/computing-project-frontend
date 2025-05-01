import { Component, Input, OnInit } from '@angular/core';
import { MomentService } from '../../../core/services/moment.service';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseModalComponent } from './exercise-modal/exercise-modal.component';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-list',
	standalone: false,
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
	constructor(public momentService: MomentService, private dialog: MatDialog, private apiService: ApiService, private snack: MatSnackBar) {}

	@Input() lists: any[];

	isLiking: boolean = false;

	ngOnInit(): void {}

	onShowExercises(list: Object) {
		const dialogRef = this.dialog.open(ExerciseModalComponent, {
			width: '900px',
			maxWidth: '90vw',
			height: '600px',
			maxHeight: '90vh',
			data: { list: list },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result && result.changed) {
				//
			}
		});
	}

	onDeleteList(list: Object) {
		this.apiService.delete('/lists', { params: { listId: list['list']['listId'] } }).subscribe({
			next: (response) => {
				this.lists = this.lists.filter((item) => item !== list);

				this.snack.open('List removed', null, {
					duration: 5000,
				});
			},
			error: (error) => {
				this.snack.open('Failed to remove list', null, {
					duration: 5000,
				});
			},
		});
	}

	onLike(list: Object) {
		if (this.isLiking || list['relationship'] === 'owned') {
			return;
		}

		this.isLiking = true;

		if (list['relationship'] !== 'following') {
			this.apiService.post('/followers', { listId: list['list']['listId'] }).subscribe({
				next: (response) => {
					list['relationship'] = 'following';
					list['list']['followerCount'] += 1;
					this.isLiking = false;
				},
				error: (error) => {
					this.snack.open('Failed to follow list', null, {
						duration: 5000,
					});

					this.isLiking = false;
				},
				complete() {
					this.isLiking = false;
				},
			});
		} else {
			this.apiService.delete('/followers', { params: { listId: list['list']['listId'] } }).subscribe({
				next: (response) => {
					list['relationship'] = 'public';
					list['list']['followerCount'] -= 1;
					this.isLiking = false;
				},
				error: (error) => {
					this.snack.open('Failed to unfollow list', null, {
						duration: 5000,
					});

					this.isLiking = false;
				},
				complete() {
					this.isLiking = false;
				},
			});
		}
	}
}
