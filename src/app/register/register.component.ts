import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	standalone: false,

	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent {
	constructor(private router: Router) {}

	loading: boolean = false;

	onConfirm() {
		this.loading = true;

		setTimeout(() => {
			this.router.navigateByUrl('/otp-confirm');
		}, 1000);
	}
}
