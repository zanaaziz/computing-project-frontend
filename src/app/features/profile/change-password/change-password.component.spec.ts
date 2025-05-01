import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password.component';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/modules/material.module';

describe('ChangePasswordComponent', () => {
	let component: ChangePasswordComponent;
	let fixture: ComponentFixture<ChangePasswordComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChangePasswordComponent],
			imports: [ReactiveFormsModule, MaterialModule],
			providers: [
				{ provide: MatDialogRef, useValue: { close: () => {} } },
				{ provide: MAT_DIALOG_DATA, useValue: {} },
				{ provide: ApiService, useValue: { patch: () => {} } },
				{ provide: MatSnackBar, useValue: { open: () => {} } },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChangePasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have currentPassword and newPassword controls', () => {
		expect(component.passwordForm.contains('currentPassword')).toBeTrue();
		expect(component.passwordForm.contains('newPassword')).toBeTrue();
	});

	it('should be invalid when empty', () => {
		expect(component.passwordForm.valid).toBeFalse();
	});
});
