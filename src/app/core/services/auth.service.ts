import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	getUser(): Object {
		return JSON.parse(localStorage.getItem('auth') || '{}');
	}

	login(user: Object): void {
		localStorage.setItem('auth', JSON.stringify(user));
	}

	logout(): void {
		localStorage.clear();
	}

	isAuth(): boolean {
		return this.getUser()['accessToken']!!;
	}

	refreshToken(): Observable<any> {
		const user = this.getUser();

		if (!user['refreshToken']) {
			this.logout();
			return throwError(() => new Error('No refresh token available'));
		}

		return this.http.post(`${this.apiUrl}/auth/refresh-token`, { refreshToken: user['refreshToken'] }).pipe(
			tap((response: any) => {
				this.login(response);
			}),
			catchError((error) => {
				this.logout();
				return throwError(() => error);
			})
		);
	}
}
