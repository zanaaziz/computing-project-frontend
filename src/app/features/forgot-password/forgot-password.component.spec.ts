import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ForgotPasswordComponent', () => {
	let component: ForgotPasswordComponent;
	let fixture: ComponentFixture<ForgotPasswordComponent>;
	let apiServiceMock: any;
	let routerMock: any;
	let snackBarMock: any;

	beforeEach(() => {
		apiServiceMock = jasmine.createSpyObj('ApiService', ['post']);
		routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
		snackBarMock = { open: jasmine.createSpy('open') };

		TestBed.configureTestingModule({
			declarations: [ForgotPasswordComponent],
			imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, BrowserAnimationsModule],
			providers: [
				{ provide: ApiService, useValue: apiServiceMock },
				{ provide: Router, useValue: routerMock },
				{ provide: MatSnackBar, useValue: snackBarMock },
			],
		});

		fixture = TestBed.createComponent(ForgotPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should have an email field with required and email validators', () => {
		const emailControl = component.form.get('email');
		expect(emailControl).toBeTruthy();

		emailControl.setValue('');
		expect(emailControl.invalid).toBeTrue();
		expect(emailControl.errors['required']).toBeTrue();

		emailControl.setValue('invalid');
		expect(emailControl.invalid).toBeTrue();
		expect(emailControl.errors['email']).toBeTrue();
	});

	it('should have a submit button', () => {
		const button = fixture.nativeElement.querySelector('button[type="submit"]');
		expect(button).toBeTruthy();
		expect(button.textContent).toContain('Continue');
	});
});
