import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/api.service';
import { ConfirmComponent } from './confirm.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ConfirmComponent', () => {
	let component: ConfirmComponent;
	let fixture: ComponentFixture<ConfirmComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ConfirmComponent],
			imports: [ReactiveFormsModule],
			providers: [
				FormBuilder,
				{ provide: Router, useValue: {} },
				{ provide: ActivatedRoute, useValue: { queryParamMap: of({ get: () => 'test@example.com' }) } },
				{ provide: ApiService, useValue: {} },
				{ provide: MatSnackBar, useValue: {} },
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize form with three controls', () => {
		expect(component.form.contains('email')).toBeTrue();
		expect(component.form.contains('verificationCode')).toBeTrue();
		expect(component.form.contains('newPassword')).toBeTrue();
	});

	it('should have an invalid form initially', () => {
		expect(component.form.invalid).toBeTrue();
	});
});
