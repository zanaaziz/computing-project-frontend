import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { ApiService } from '../../../../core/services/api.service';
import { FormControl } from '@angular/forms';
import { MomentService } from '../../../../core/services/moment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-comments',
	standalone: false,
	templateUrl: './comments.component.html',
	styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
	constructor(
		private apiService: ApiService,
		public authService: AuthService,
		public dialogRef: MatDialogRef<CommentsComponent>,
		public momentService: MomentService,
		private snack: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public data
	) {
		dialogRef.disableClose = true;

		dialogRef.backdropClick().subscribe((result) => {
			this.onClose();
		});
	}

	isLoading: boolean = false;
	isCommenting: boolean = false;
	comments = [];
	input: FormControl = new FormControl('');

	ngOnInit(): void {
		this.getComments();
	}

	getComments() {
		if (this.isLoading) return;

		this.isLoading = true;

		this.apiService.get('/comments', { params: { exerciseId: this.data.exercise.exerciseId } }).subscribe({
			next: (response) => {
				this.comments = response;
				this.isLoading = false;
			},
			error: (error) => {
				this.snack.open('Failed fetching comments', null, {
					duration: 5000,
				});

				this.isLoading = false;
			},
			complete() {
				this.isLoading = false;
			},
		});
	}

	onClose(): void {
		this.dialogRef.close(this.data.exercise);
	}

	onComment() {
		if (this.isCommenting || this.input.value.length === 0) {
			return;
		}

		this.isCommenting = true;

		this.apiService.post('/comments', { exerciseId: this.data.exercise.exerciseId, content: this.input.value }).subscribe({
			next: (newComment) => {
				this.input.reset();
				this.data.exercise.commentCount += 1;
				this.comments.unshift(newComment);
				this.isCommenting = false;
			},
			error: (error) => {
				this.snack.open('Failed posting comment', null, {
					duration: 5000,
				});

				this.isCommenting = false;
			},
			complete() {
				this.isCommenting = false;
			},
		});
	}
}
