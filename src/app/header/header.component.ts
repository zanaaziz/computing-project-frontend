import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	standalone: false,

	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	constructor(public authService: AuthService, private router: Router) {}

	onLogout() {
		this.authService.logout();
		this.router.navigateByUrl('/');
	}
}
