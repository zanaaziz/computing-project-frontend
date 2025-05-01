import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-forgot-password',
	standalone: false,
	templateUrl: './forgot-password.component.html',
	styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
	constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder, private snack: MatSnackBar) {
		this.form = this.fb.group({
			email: [undefined, [Validators.required, Validators.email]],
		});
	}

	form: FormGroup;
	loading: boolean = false;

	onSubmit() {
		if (this.form.invalid || this.loading) {
			return;
		}

		this.loading = true;

		this.apiService.post('/auth/forgot-password', { email: this.form.value.email }).subscribe({
			next: (response) => {
				this.router.navigateByUrl(`/auth/forgot-password/confirm?email=${this.form.value.email}`);
				this.loading = false;
			},
			error: (error) => {
				this.snack.open('Invalid credentials', null, {
					duration: 5000,
				});
				this.loading = false;
			},
			complete: () => {
				this.loading = false;
			},
		});
	}

	ngOnInit(): void {}
}
