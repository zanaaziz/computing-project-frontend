import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-confirm',
	standalone: false,
	templateUrl: './confirm.component.html',
	styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
	constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder, private snack: MatSnackBar) {
		this.form = this.fb.group({
			email: [undefined, [Validators.required, Validators.email]],
			verificationCode: [undefined, [Validators.required]],
			newPassword: [undefined, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')]],
		});
	}

	form: FormGroup;
	loading: boolean = false;
	showPassword: boolean = false;
	canResend: boolean = true;

	onResendCode() {
		if (!this.canResend || this.loading) {
			return;
		}

		this.loading = true;

		this.apiService.post('/auth/forgot-password', { email: this.form.value.email }).subscribe({
			next: (response) => {
				this.snack.open('Code resent to your email', null, {
					duration: 5000,
				});

				this.canResend = false;
				this.loading = false;
			},
			error: (error) => {
				this.snack.open('Failed to resend code', null, {
					duration: 5000,
				});

				this.canResend = false;
				this.loading = false;
			},
			complete: () => {
				this.canResend = false;
				this.loading = false;
			},
		});
	}

	onSubmit() {
		if (this.form.invalid || this.loading) {
			return;
		}

		this.loading = true;

		this.apiService.post('/auth/forgot-password/confirm', this.form.value).subscribe({
			next: (response) => {
				this.snack.open('Password has been reset, proceed to login', null, {
					duration: 5000,
				});

				this.router.navigateByUrl(`/auth/login?email=${this.form.value.email}`);
				this.loading = false;
			},
			error: (error) => {
				this.snack.open('Password reset failed', null, {
					duration: 5000,
				});

				this.loading = false;
			},
			complete: () => {
				this.loading = false;
			},
		});
	}

	async ngOnInit() {
		const queryParams = await firstValueFrom(this.route.queryParamMap);
		this.form.get('email').setValue(queryParams.get('email'));
	}
}
