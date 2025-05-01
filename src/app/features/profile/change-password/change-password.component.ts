import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-change-password',
	standalone: false,
	templateUrl: './change-password.component.html',
	styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
	passwordForm: FormGroup;
	isLoading: boolean = false;
	showPassword: boolean = false;

	constructor(
		private apiService: ApiService,
		private fb: FormBuilder,
		private snack: MatSnackBar,
		public dialogRef: MatDialogRef<ChangePasswordComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.passwordForm = this.fb.group({
			currentPassword: new FormControl(undefined, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')]),
			newPassword: new FormControl(undefined, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')]),
		});
	}

	onSubmit() {
		if (this.passwordForm.invalid) return;

		this.isLoading = true;
		const { currentPassword, newPassword } = this.passwordForm.value;

		this.apiService.patch('/users/me/password', { currentPassword, newPassword }).subscribe({
			next: () => {
				this.dialogRef.close({ changed: true });
				this.isLoading = false;
			},
			error: (error) => {
				this.snack.open('Failed to change password', null, {
					duration: 5000,
				});

				this.isLoading = false;
			},
		});
	}
}
