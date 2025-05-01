import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let apiServiceSpy: jasmine.SpyObj<ApiService>;
	let authServiceSpy: jasmine.SpyObj<AuthService>;
	let routerSpy: jasmine.SpyObj<Router>;
	let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
	let activatedRouteMock: { queryParams: any };

	beforeEach(async () => {
		// Create spy objects for services
		apiServiceSpy = jasmine.createSpyObj('ApiService', ['post']);
		authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
		routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
		snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
		activatedRouteMock = { queryParams: of({}) }; // Mock ActivatedRoute with empty query params

		// Configure the testing module
		await TestBed.configureTestingModule({
			declarations: [LoginComponent],
			imports: [
				ReactiveFormsModule, // For form handling
				MaterialModule, // For material components like mat-form-field
				BrowserAnimationsModule, // Required for material animations
			],
			providers: [
				{ provide: ApiService, useValue: apiServiceSpy },
				{ provide: AuthService, useValue: authServiceSpy },
				{ provide: Router, useValue: routerSpy },
				{ provide: MatSnackBar, useValue: snackBarSpy },
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		// Initialize component and trigger change detection
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges(); // Calls ngOnInit
	});

	/** Test 1: Component Creation */
	it('should create', () => {
		expect(component).toBeTruthy();
	});

	/** Test 2: No API Call with Invalid Form */
	it('should not call apiService.post when form is invalid', () => {
		// Form is invalid initially (email and password are required)
		const formElement = fixture.nativeElement.querySelector('form');
		formElement.dispatchEvent(new Event('submit')); // Trigger form submission
		expect(apiServiceSpy.post).not.toHaveBeenCalled();
	});

	/** Test 3: API Call with Valid Form */
	it('should call apiService.post with form data when form is valid', () => {
		// Set valid form values (password matches pattern: 8+ chars, 1 uppercase, 1 lowercase, 1 number)
		component.form.setValue({ email: 'test@example.com', password: 'Password1' });
		apiServiceSpy.post.and.returnValue(of({})); // Mock API response to complete subscription
		fixture.detectChanges(); // Update form state in the template
		const formElement = fixture.nativeElement.querySelector('form');
		formElement.dispatchEvent(new Event('submit')); // Trigger form submission
		expect(apiServiceSpy.post).toHaveBeenCalledWith('/auth/login', {
			email: 'test@example.com',
			password: 'Password1',
		});
	});
});
