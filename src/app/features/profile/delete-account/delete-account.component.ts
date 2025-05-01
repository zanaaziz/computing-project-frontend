import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-delete-account',
	standalone: false,
	templateUrl: './delete-account.component.html',
	styleUrl: './delete-account.component.scss',
})
export class DeleteAccountComponent {
	confirmationForm: FormGroup;
	isLoading: boolean = false;
	errorMessage: string = '';

	constructor(
		private apiService: ApiService,
		private fb: FormBuilder,
		private snack: MatSnackBar,
		public dialogRef: MatDialogRef<DeleteAccountComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.confirmationForm = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email]),
		});
	}

	onSubmit() {
		if (this.confirmationForm.invalid) return;

		const enteredEmail = this.confirmationForm.value.email;

		if (enteredEmail !== this.data.profile.email) {
			this.errorMessage = 'Email does not match your account email';
			return;
		}

		this.isLoading = true;

		this.apiService.delete('/users/me').subscribe({
			next: () => {
				this.dialogRef.close({ deleted: true });
				this.isLoading = false;
			},
			error: (error) => {
				this.snack.open('Failed to delete your account', null, {
					duration: 5000,
				});

				this.isLoading = false;
			},
		});
	}
}
