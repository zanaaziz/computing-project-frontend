import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private baseUrl: string = environment.apiUrl;

	constructor(private http: HttpClient) {}

	// GET request
	get(endpoint: string, options?: { params?: any }): Observable<any> {
		const params = options?.params ? new HttpParams({ fromObject: options.params }) : undefined;
		return this.http.get(`${this.baseUrl}${endpoint}`, { params }).pipe(catchError(this.handleError));
	}

	// POST request
	post(endpoint: string, body?: any): Observable<any> {
		return this.http.post(`${this.baseUrl}${endpoint}`, body).pipe(catchError(this.handleError));
	}

	// PUT request
	put(endpoint: string, body?: any): Observable<any> {
		return this.http.put(`${this.baseUrl}${endpoint}`, body).pipe(catchError(this.handleError));
	}

	// PATCH request
	patch(endpoint: string, body?: any): Observable<any> {
		return this.http.patch(`${this.baseUrl}${endpoint}`, body).pipe(catchError(this.handleError));
	}

	// DELETE request
	delete(endpoint: string, options?: { params?: any }): Observable<any> {
		const params = options?.params ? new HttpParams({ fromObject: options.params }) : undefined;
		return this.http.delete(`${this.baseUrl}${endpoint}`, { params }).pipe(catchError(this.handleError));
	}

	// Error handling
	private handleError(error: any): Observable<never> {
		let errorMessage = 'An error occurred';
		if (error.error instanceof ErrorEvent) {
			// Client-side error
			errorMessage = `Error: ${error.error.message}`;
		} else {
			// Server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.error(errorMessage);
		return throwError(() => new Error(errorMessage));
	}
}
