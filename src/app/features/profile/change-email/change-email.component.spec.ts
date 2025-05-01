import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChangeEmailComponent } from './change-email.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockApiService {
	patch(url: string, body?: any) {
		if (url === '/users/me/email') {
			return of({});
		}
		return throwError(() => new Error('Invalid URL'));
	}

	post(url: string, body?: any) {
		if (url === '/users/me/email/verify' || url === '/users/me/email/resend-code') {
			return of({});
		}
		return throwError(() => new Error('Invalid URL'));
	}
}

class MockMatSnackBar {
	open(message: string, action: string | null, config: any) {}
}

describe('ChangeEmailComponent', () => {
	let component: ChangeEmailComponent;
	let fixture: ComponentFixture<ChangeEmailComponent>;
	let mockApiService: MockApiService;
	let mockSnackBar: MockMatSnackBar;
	let dialogRef: MatDialogRef<ChangeEmailComponent>;

	beforeEach(async () => {
		const mockDialogData = {
			profile: {
				email: 'old@example.com',
			},
		};
		mockApiService = new MockApiService();
		mockSnackBar = new MockMatSnackBar();
		dialogRef = { close: jasmine.createSpy('close') } as any;

		await TestBed.configureTestingModule({
			declarations: [ChangeEmailComponent],
			imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
			providers: [
				{ provide: ApiService, useValue: mockApiService },
				{ provide: MatSnackBar, useValue: mockSnackBar },
				{ provide: MAT_DIALOG_DATA, useValue: mockDialogData },
				{ provide: MatDialogRef, useValue: dialogRef },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChangeEmailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with step 1 and defined forms', () => {
		expect(component.step).toBe(1);
		expect(component.newEmailForm).toBeDefined();
		expect(component.newEmailForm.get('newEmail')).toBeDefined();
		expect(component.otpForm).toBeDefined();
		expect(component.otpForm.get('otp')).toBeDefined();
	});

	it('should display current email and new email input in step 1', () => {
		const currentEmailInput = fixture.nativeElement.querySelector('input[disabled]');
		const newEmailInput = fixture.nativeElement.querySelector('input[formControlName="newEmail"]');
		expect(currentEmailInput.value).toBe('old@example.com');
		expect(newEmailInput).toBeTruthy();
	});

	it('should not submit invalid new email form', () => {
		spyOn(mockApiService, 'patch');
		component.newEmailForm.setValue({ newEmail: 'invalid' });
		component.onSubmitNewEmail();
		expect(mockApiService.patch).not.toHaveBeenCalled();
	});

	it('should submit new email and proceed to step 2 on success', fakeAsync(() => {
		spyOn(mockApiService, 'patch').and.callThrough();
		spyOn(mockSnackBar, 'open');
		component.newEmailForm.setValue({ newEmail: 'new@example.com' });
		component.onSubmitNewEmail();
		tick();
		expect(mockApiService.patch).toHaveBeenCalledWith('/users/me/email', { newEmail: 'new@example.com' });
		expect(mockSnackBar.open).toHaveBeenCalledWith('A code has been sent to your new email', null, { duration: 5000 });
		expect(component.step).toBe(2);
		expect(component.isLoading).toBe(false);
	}));

	it('should handle new email submission failure', fakeAsync(() => {
		spyOn(mockApiService, 'patch').and.returnValue(throwError(() => new Error('Error')));
		spyOn(mockSnackBar, 'open');
		component.newEmailForm.setValue({ newEmail: 'new@example.com' });
		component.onSubmitNewEmail();
		tick();
		expect(mockSnackBar.open).toHaveBeenCalledWith('Failed to send code to your new email', null, { duration: 5000 });
		expect(component.isLoading).toBe(false);
	}));

	it('should not submit invalid OTP form', () => {
		component.step = 2;
		spyOn(mockApiService, 'post');
		component.otpForm.setValue({ otp: '' }); // Empty OTP
		component.onSubmitOtp();
		expect(mockApiService.post).not.toHaveBeenCalled();
	});

	it('should submit OTP and close dialog on success', fakeAsync(() => {
		component.step = 2;
		component.newEmailForm.setValue({ newEmail: 'new@example.com' });
		spyOn(mockApiService, 'post').and.callThrough();
		component.otpForm.setValue({ otp: '123456' });
		component.onSubmitOtp();
		tick();
		expect(mockApiService.post).toHaveBeenCalledWith('/users/me/email/verify', {
			newEmail: 'new@example.com',
			verificationCode: '123456',
		});
		expect(component.data.profile.email).toBe('new@example.com');
		expect(dialogRef.close).toHaveBeenCalledWith({ changed: true });
		expect(component.isLoading).toBe(false);
	}));

	it('should handle OTP submission failure', fakeAsync(() => {
		component.step = 2;
		component.newEmailForm.setValue({ newEmail: 'new@example.com' });
		spyOn(mockApiService, 'post').and.returnValue(throwError(() => new Error('Error')));
		spyOn(mockSnackBar, 'open');
		component.otpForm.setValue({ otp: '123456' });
		component.onSubmitOtp();
		tick();
		expect(mockSnackBar.open).toHaveBeenCalledWith('Failed to verify your new email', null, { duration: 5000 });
		expect(component.isLoading).toBe(false);
	}));

	it('should resend code and update state on success', fakeAsync(() => {
		component.step = 2;
		spyOn(mockApiService, 'post').and.callThrough();
		spyOn(mockSnackBar, 'open');
		component.onResendCode();
		tick();
		expect(mockApiService.post).toHaveBeenCalledWith('/users/me/email/resend-code');
		expect(mockSnackBar.open).toHaveBeenCalledWith('Code resent to your new email', null, { duration: 5000 });
		expect(component.canResend).toBe(false);
		expect(component.isLoading).toBe(false);
	}));

	it('should handle resend code failure', fakeAsync(() => {
		component.step = 2;
		spyOn(mockApiService, 'post').and.returnValue(throwError(() => new Error('Error')));
		spyOn(mockSnackBar, 'open');
		component.onResendCode();
		tick();
		expect(mockSnackBar.open).toHaveBeenCalledWith('Failed to resend code', null, { duration: 5000 });
		expect(component.canResend).toBe(false);
		expect(component.isLoading).toBe(false);
	}));

	it('should not resend code when loading or cannot resend', () => {
		spyOn(mockApiService, 'post');

		component.isLoading = true;
		component.canResend = true;
		component.onResendCode();
		expect(mockApiService.post).not.toHaveBeenCalled();

		component.isLoading = false;
		component.canResend = false;
		component.onResendCode();
		expect(mockApiService.post).not.toHaveBeenCalled();
	});
});
