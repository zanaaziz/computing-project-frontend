import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
	const authService = inject(AuthService);
	const token = authService.getUser()['accessToken'];

	if (
		token &&
		req.headers.get('Authorization') !== '' &&
		!req.url.includes('-images.s3.eu-west-1.amazonaws.com/profile-photos/') &&
		!req.url.includes('-images.s3.eu-west-1.amazonaws.com/cover-photos/')
	) {
		req = addToken(req, token);
	}

	return next(req).pipe(
		catchError((error) => {
			if (error instanceof HttpErrorResponse && error.status === 401) {
				return handle401Error(req, next, authService);
			}
			return throwError(() => error);
		})
	);
}

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
	return request.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`,
		},
	});
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
	if (!isRefreshing) {
		isRefreshing = true;
		refreshTokenSubject.next(null);

		return authService.refreshToken().pipe(
			switchMap((response: any) => {
				isRefreshing = false;
				const newToken = response.accessToken;
				refreshTokenSubject.next(newToken);
				return next(addToken(request, newToken)); // retry original request
			}),
			catchError((err) => {
				isRefreshing = false;
				authService.logout();
				return throwError(() => err);
			})
		);
	} else {
		// Queue requests during refresh
		return refreshTokenSubject.pipe(
			filter((token) => token !== null),
			take(1),
			switchMap((token) => next(addToken(request, token!)))
		);
	}
}
