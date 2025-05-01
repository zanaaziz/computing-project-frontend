import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FollowersComponent } from '../../shared/components/followers/followers.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-profile',
	standalone: false,

	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	constructor(
		private apiService: ApiService,
		private http: HttpClient,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute,
		private dialog: MatDialog,
		private cdr: ChangeDetectorRef,
		private snack: MatSnackBar
	) {}

	@ViewChild('profilePhotoInput') profilePhotoInput: ElementRef;
	@ViewChild('coverPhotoInput') coverPhotoInput: ElementRef;
	private allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

	isLoading: boolean = false;
	isFollowersLoading: boolean = false;
	isListsLoading: boolean = false;
	isEditingName: boolean = false;
	isSelfProfile: boolean = false;
	isUserNotFound: boolean;
	isFollowing: boolean;
	editedName: string;
	profile: Object;
	followers = [];
	followings = [];
	lists = null;

	async ngOnInit(): Promise<void> {
		const params = await firstValueFrom(this.route.paramMap);

		this.route.paramMap.subscribe((params) => {
			this.getProfile(params.get('userId'));
			this.getFollowers(params.get('userId'));
			this.getLists(params.get('userId'));
		});
	}

	getProfile(userId?: string) {
		if (this.isLoading) return;

		this.isLoading = true;

		if (userId && this.authService.getUser()['userId'] !== userId) {
			this.isSelfProfile = false;
		} else {
			this.isSelfProfile = true;
		}

		this.apiService.get(this.isSelfProfile ? '/users/me' : `/users/${userId}`).subscribe({
			next: (response) => {
				this.profile = response;
				this.isEditingName = false;
				this.editedName = response.name;
				this.isLoading = false;
			},
			error: (error) => {
				console.error('Error fetching data:', error);
				this.isUserNotFound = true;
				this.isLoading = false;
			},
			complete() {
				this.isLoading = false;
			},
		});
	}

	getFollowers(userId?: string) {
		if (this.isFollowersLoading) return;

		this.isFollowersLoading = true;

		if (!userId) {
			userId = this.authService.getUser()['userId'];
		}

		this.apiService.get('/followers', { params: { userId } }).subscribe({
			next: (response) => {
				this.followers = response['followers'];
				this.followings = response['followings'];

				this.isFollowing = response['followers'].some((obj) => obj.userId === this.authService.getUser()['userId']);
				this.isFollowersLoading = false;
			},
			error: (error) => {
				this.isUserNotFound = true;
				this.isFollowersLoading = false;
			},
			complete() {
				this.isFollowersLoading = false;
			},
		});
	}

	getLists(userId?: string) {
		if (this.isListsLoading) return;

		this.isListsLoading = true;

		this.apiService.get('/lists', userId ? { params: { userId } } : undefined).subscribe({
			next: (response) => {
				this.lists = response;
				this.isListsLoading = false;
			},
			error: (error) => {
				this.isUserNotFound = true;
				this.isListsLoading = false;
			},
			complete() {
				this.isListsLoading = false;
			},
		});
	}

	onFollow() {
		this.apiService.post('/followers', { userId: this.profile['userId'] }).subscribe({
			next: (response) => {
				this.isFollowing = true;
				this.profile['followerCount'] += 1;
			},
			error: (error) => {
				//
			},
			complete() {
				//
			},
		});
	}

	onUnfollow() {
		this.apiService.delete('/followers', { params: { userId: this.profile['userId'] } }).subscribe({
			next: (response) => {
				this.isFollowing = false;
				this.profile['followerCount'] -= 1;
			},
			error: (error) => {
				//
			},
			complete() {
				//
			},
		});
	}

	onShowFollowers() {
		if (this.profile?.['followerCount'] === 0) {
			return;
		}

		const dialogRef = this.dialog.open(FollowersComponent, {
			width: '500px',
			maxWidth: '90vw',
			height: '350px',
			maxHeight: '90vh',
			data: { profile: this.profile, followers: this.followers, followings: this.followings, show: 'followers' },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result && result.changed) {
				//
			}
		});
	}

	onShowFollowings() {
		if (this.followings.length === 0) {
			return;
		}

		const dialogRef = this.dialog.open(FollowersComponent, {
			width: '500px',
			maxWidth: '90vw',
			height: '350px',
			maxHeight: '90vh',
			data: { profile: this.profile, followers: this.followers, followings: this.followings, show: 'followings' },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result && result.changed) {
				//
			}
		});
	}

	onUpdateName() {
		this.profile['name'] = this.editedName;
		this.isEditingName = false;

		this.apiService.patch('/users/me', { name: this.editedName }).subscribe({
			next: (response) => {
				this.snack.open('Name has been updated', null, {
					duration: 5000,
				});
			},
			error: (error) => {
				this.snack.open('Failed to update name', null, {
					duration: 5000,
				});
			},
		});
	}

	onCancelEditName() {
		this.isEditingName = false;
		this.editedName = this.profile['name'];
	}

	onChangeEmail() {
		const dialogRef = this.dialog.open(ChangeEmailComponent, {
			width: '500px',
			maxWidth: '90vw',
			height: '350px',
			maxHeight: '90vh',
			data: { profile: this.profile },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result && result.changed) {
				this.snack.open('Email updated', null, {
					duration: 5000,
				});
			}
		});
	}

	onChangePassword() {
		const dialogRef = this.dialog.open(ChangePasswordComponent, {
			width: '500px',
			maxWidth: '90vw',
			height: '350px',
			maxHeight: '90vh',
			data: { profile: this.profile },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result && result.changed) {
				this.snack.open('Password updated', null, {
					duration: 5000,
				});
			}
		});
	}

	onDeleteAccount() {
		const dialogRef = this.dialog.open(DeleteAccountComponent, {
			width: '500px',
			maxWidth: '90vw',
			height: '350px',
			maxHeight: '90vh',
			data: { profile: this.profile },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result && result.deleted) {
				this.snack.open('Your account and data has been deleted, sorry to see you go', null, {
					duration: 5000,
				});

				this.authService.logout();
				this.router.navigateByUrl('/');
			}
		});
	}

	onEditProfilePhoto() {
		this.profilePhotoInput.nativeElement.click();
	}

	onEditCoverPhoto() {
		this.coverPhotoInput.nativeElement.click();
	}

	private isAllowedMimeType(mimeType: string): boolean {
		return this.allowedMimeTypes.includes(mimeType);
	}

	private getProfilePhotoPresignedUrl(mimeType: string) {
		return this.apiService
			.get('/users/me/profile-photo-upload-url', { params: { contentType: mimeType } })
			.toPromise()
			.then((response) => response);
	}

	private getCoverPhotoPresignedUrl(mimeType: string) {
		return this.apiService
			.get('/users/me/cover-photo-upload-url', { params: { contentType: mimeType } })
			.toPromise()
			.then((response) => response);
	}

	private uploadToS3(url: string, file: File) {
		const headers = { 'Content-Type': file.type };
		return this.http.put(url, file, { headers });
	}

	onProfilePhotoSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			if (this.isAllowedMimeType(file.type)) {
				this.getProfilePhotoPresignedUrl(file.type).then(({ uploadUrl, key }) => {
					this.uploadToS3(uploadUrl, file)
						.toPromise()
						.then(() => {
							this.apiService.put('/users/me/profile-photo', { key }).subscribe({
								next: (response) => {
									this.profile['profilePhotoUrl'] = response.profilePhotoUrl;
									this.cdr.detectChanges();

									this.snack.open('Photo updated', null, {
										duration: 5000,
									});
								},
								error: (error) => {
									this.snack.open('Photo update failed, please try again', null, {
										duration: 5000,
									});
								},
							});
						});
				});
			} else {
				this.snack.open('Invalid file type. Only JPEG, PNG, and WebP are allowed', null, {
					duration: 5000,
				});
			}
		}
	}

	onCoverPhotoSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			if (this.isAllowedMimeType(file.type)) {
				this.getCoverPhotoPresignedUrl(file.type).then(({ uploadUrl, key }) => {
					this.uploadToS3(uploadUrl, file)
						.toPromise()
						.then(() => {
							this.apiService.put('/users/me/cover-photo', { key }).subscribe({
								next: (response) => {
									this.profile['coverPhotoUrl'] = response.coverPhotoUrl;
									this.cdr.detectChanges();

									this.snack.open('Photo updated', null, {
										duration: 5000,
									});
								},
								error: (error) => {
									this.snack.open('Photo update failed, please try again', null, {
										duration: 5000,
									});
								},
							});
						});
				});
			} else {
				this.snack.open('Invalid file type. Only JPEG, PNG, and WebP are allowed', null, {
					duration: 5000,
				});
			}
		}
	}
}
