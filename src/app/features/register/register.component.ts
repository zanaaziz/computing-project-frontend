import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-register',
	standalone: false,

	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent {
	constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder, private snack: MatSnackBar) {
		this.form = this.fb.group({
			name: [undefined, [Validators.required]],
			email: [undefined, [Validators.required, Validators.email]],
			password: [undefined, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')]],
		});
	}

	form;
	loading: boolean = false;
	showPassword: boolean = false;

	onSubmit() {
		if (this.form.invalid) {
			return;
		}

		this.loading = true;

		this.apiService.post('/auth/register', this.form.value).subscribe({
			next: (response) => {
				this.snack.open('Thanks, a code has been emailed to you', null, {
					duration: 5000,
				});

				this.router.navigateByUrl(`/auth/otp-confirm?email=${this.form.value.email}&username=${response.username}`);
			},
			error: (error) => {
				this.snack.open('Registration failed, please try again', null, {
					duration: 5000,
				});
				this.loading = false;
			},
			complete: () => {
				this.loading = false;
			},
		});
	}
}
