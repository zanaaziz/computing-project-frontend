import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-login',
	standalone: false,

	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private apiService: ApiService,
		private fb: FormBuilder,
		private authService: AuthService,
		private snack: MatSnackBar
	) {
		this.form = this.fb.group({
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

		this.apiService.post('/auth/login', this.form.value).subscribe({
			next: (response) => {
				this.authService.login(response);

				this.snack.open('Welcome back', null, {
					duration: 5000,
				});

				this.router.navigateByUrl('/');
			},
			error: (error) => {
				console.log('Login failed:', error);

				this.snack.open('Invalid credentials, please try again', null, {
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
				this.form.controls.email.setValue(params['email']);
			}
		});
	}
}
