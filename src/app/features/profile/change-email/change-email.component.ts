import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-change-email',
	standalone: false,
	templateUrl: './change-email.component.html',
	styleUrl: './change-email.component.scss',
})
export class ChangeEmailComponent {
	step: number = 1;
	newEmailForm: FormGroup;
	otpForm: FormGroup;
	isLoading: boolean = false;
	canResend: boolean = true;

	constructor(
		private apiService: ApiService,
		private fb: FormBuilder,
		private snack: MatSnackBar,
		public dialogRef: MatDialogRef<ChangeEmailComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.newEmailForm = this.fb.group({
			newEmail: new FormControl('', [Validators.required, Validators.email]),
		});

		this.otpForm = this.fb.group({
			otp: new FormControl('', [Validators.required]),
		});
	}

	onSubmitNewEmail() {
		if (this.newEmailForm.invalid) return;

		this.isLoading = true;
		const newEmail = this.newEmailForm.get('newEmail')!.value;

		this.apiService.patch('/users/me/email', { newEmail }).subscribe({
			next: () => {
				this.snack.open('A code has been sent to your new email', null, {
					duration: 5000,
				});

				this.step = 2;
				this.isLoading = false;
			},
			error: (error) => {
				this.snack.open('Failed to send code to your new email', null, {
					duration: 5000,
				});

				this.isLoading = false;
			},
		});
	}

	onSubmitOtp() {
		if (this.otpForm.invalid) return;

		this.isLoading = true;
		const otp = this.otpForm.get('otp')!.value;
		const newEmail = this.newEmailForm.get('newEmail')!.value;

		this.apiService.post('/users/me/email/verify', { newEmail, verificationCode: otp }).subscribe({
			next: () => {
				this.data.profile.email = newEmail;
				this.isLoading = false;
				this.dialogRef.close({ changed: true });
			},
			error: (error) => {
				this.snack.open('Failed to verify your new email', null, {
					duration: 5000,
				});

				this.isLoading = false;
			},
		});
	}

	onResendCode() {
		if (!this.canResend || this.isLoading) {
			return;
		}

		this.isLoading = true;

		this.apiService.post('/users/me/email/resend-code').subscribe({
			next: (response) => {
				this.snack.open('Code resent to your new email', null, {
					duration: 5000,
				});

				this.canResend = false;
				this.isLoading = false;
			},
			error: (error) => {
				this.snack.open('Failed to resend code', null, {
					duration: 5000,
				});

				this.canResend = false;
				this.isLoading = false;
			},
			complete: () => {
				this.canResend = false;
				this.isLoading = false;
			},
		});
	}
}
