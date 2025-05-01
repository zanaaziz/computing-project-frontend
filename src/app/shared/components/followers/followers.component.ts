import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-followers',
	standalone: false,
	templateUrl: './followers.component.html',
	styleUrl: './followers.component.scss',
})
export class FollowersComponent implements OnInit {
	constructor(
		private apiService: ApiService,
		public authService: AuthService,
		public dialogRef: MatDialogRef<FollowersComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		dialogRef.disableClose = true;

		dialogRef.backdropClick().subscribe((result) => {
			this.onClose();
		});
	}

	isSelfFollowersLoading: boolean = false;
	selfFollowers: any[] = null;
	selfFollowings: any[] = null;

	ngOnInit(): void {
		this.getSelfFollowers();
	}

	onFollow(user: Object) {
		this.apiService.post('/followers', { userId: user['userId'] }).subscribe({
			next: (response) => {
				this.selfFollowings.unshift(user);
			},
			error: (error) => {
				//
			},
			complete() {
				//
			},
		});
	}

	onUnFollow(user: Object) {
		this.apiService.delete('/followers', { params: { userId: user['userId'] } }).subscribe({
			next: (response) => {
				const index = this.selfFollowings.findIndex((item) => item.userId === user['userId']);
				if (index !== -1) {
					this.selfFollowings.splice(index, 1);
				}
			},
			error: (error) => {
				//
			},
			complete() {
				//
			},
		});
	}

	onClose(): void {
		this.dialogRef.close(this.data.exercise);
	}

	getSelfFollowers() {
		if (this.isSelfFollowersLoading) {
			return;
		}

		if (this.data.profile['userId'] === this.authService.getUser()['userId']) {
			this.selfFollowers = this.data.followers;
			this.selfFollowings = this.data.followings;
			return;
		}

		this.isSelfFollowersLoading = true;

		this.apiService.get('/followers', { params: { userId: this.authService.getUser()['userId'] } }).subscribe({
			next: (response) => {
				this.selfFollowers = response['followers'];
				this.selfFollowings = response['followings'];
				this.isSelfFollowersLoading = false;
			},
			error: (error) => {
				this.isSelfFollowersLoading = false;
			},
			complete() {
				this.isSelfFollowersLoading = false;
			},
		});
	}

	isUserIn(targetObj: Object, arr: any[]) {
		function isEqual(obj1, obj2) {
			if (obj1 === obj2) return true;
			if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;

			const keys1 = Object.keys(obj1);
			const keys2 = Object.keys(obj2);

			if (keys1.length !== keys2.length) return false;

			for (const key of keys1) {
				if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) return false;
			}

			return true;
		}

		return arr.some((obj) => isEqual(obj, targetObj));
	}
}
