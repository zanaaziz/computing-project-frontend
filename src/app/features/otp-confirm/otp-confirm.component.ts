import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-otp-confirm',
	standalone: false,

	templateUrl: './otp-confirm.component.html',
	styleUrl: './otp-confirm.component.scss',
})
export class OtpConfirmComponent implements OnInit {
	constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder, private snack: MatSnackBar) {
		this.form = this.fb.group({
			email: [undefined, [Validators.required, Validators.email]],
			code: [undefined, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
		});
	}

	form: FormGroup;
	loading: boolean = false;
	canResend: boolean = true;
	username: string;

	onResendCode() {
		if (!this.canResend || this.loading) {
			return;
		}

		this.loading = true;

		this.apiService.post('/auth/register/resend-code', { username: this.username }).subscribe({
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

		this.apiService.post('/auth/register/confirm-email', this.form.value).subscribe({
			next: (response) => {
				this.snack.open('Welcome aboard', null, {
					duration: 5000,
				});

				this.router.navigateByUrl(`/auth/login?email=${this.form.value.email}`);
			},
			error: (error) => {
				this.snack.open('Code verification failed', null, {
					duration: 5000,
				});

				this.loading = false;
			},
			complete: () => {
				this.loading = false;
			},
		});
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			if (params['email']) {
				this.form.controls['email'].setValue(params['email']);
				this.username = params['username'];
			}
		});
	}
}
