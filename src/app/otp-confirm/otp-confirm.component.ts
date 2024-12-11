import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-otp-confirm',
	standalone: false,

	templateUrl: './otp-confirm.component.html',
	styleUrl: './otp-confirm.component.scss',
})
export class OtpConfirmComponent {
	constructor(private router: Router, private snack: MatSnackBar) {}

	loading: boolean = false;

	onConfirm() {
		this.loading = true;

		setTimeout(() => {
			this.snack.open('✅ verification success', undefined, { duration: 3000 });
			this.router.navigateByUrl('/');
		}, 1000);
	}
}
