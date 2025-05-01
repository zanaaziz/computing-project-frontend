import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { OtpConfirmComponent } from './otp-confirm.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

describe('OtpConfirmComponent', () => {
	let component: OtpConfirmComponent;
	let fixture: ComponentFixture<OtpConfirmComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OtpConfirmComponent],
			imports: [ReactiveFormsModule, MaterialModule],
			providers: [
				{ provide: ActivatedRoute, useValue: { queryParams: of({ email: 'test@example.com', username: 'testuser' }) } },
				{ provide: ApiService, useValue: { post: jasmine.createSpy('post').and.returnValue(of({})) } },
				{ provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OtpConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a code control in the form', () => {
		expect(component.form.contains('code')).toBeTrue();
	});

	it('should render code input field', () => {
		const input = fixture.debugElement.query(By.css('input[formControlName="code"]'));
		expect(input).toBeTruthy();
	});
});
