import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: false,

	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	constructor(private router: Router) {}

	loading: boolean = false;

	onConfirm() {
		this.loading = true;

		setTimeout(() => {
			this.router.navigateByUrl('/otp-confirm');
		}, 1000);
	}
}
