import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;
	let mockRouter: any;
	let mockApiService: any;
	let mockSnackBar: any;

	beforeEach(() => {
		mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
		mockApiService = jasmine.createSpyObj('ApiService', ['post']);
		mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

		TestBed.configureTestingModule({
			declarations: [RegisterComponent],
			imports: [ReactiveFormsModule],
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: ApiService, useValue: mockApiService },
				{ provide: MatSnackBar, useValue: mockSnackBar },
			],
			schemas: [NO_ERRORS_SCHEMA],
		});

		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize the form with name, email, and password controls', () => {
		expect(component.form.contains('name')).toBeTrue();
		expect(component.form.contains('email')).toBeTrue();
		expect(component.form.contains('password')).toBeTrue();
	});

	it('should not call API when form is invalid', () => {
		component.onSubmit();
		expect(mockApiService.post).not.toHaveBeenCalled();
	});
});
