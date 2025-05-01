import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteAccountComponent } from './delete-account.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/modules/material.module';

describe('DeleteAccountComponent', () => {
	let component: DeleteAccountComponent;
	let fixture: ComponentFixture<DeleteAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, MaterialModule],
			declarations: [DeleteAccountComponent],
			providers: [
				{ provide: MatDialogRef, useValue: { close: () => {} } },
				{ provide: MAT_DIALOG_DATA, useValue: { profile: { email: 'test@example.com' } } },
				{ provide: ApiService, useValue: {} },
				{ provide: MatSnackBar, useValue: {} },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DeleteAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have an invalid form when email is empty', () => {
		expect(component.confirmationForm.invalid).toBeTrue();
	});

	it('should have a valid form when email is valid', () => {
		component.confirmationForm.get('email').setValue('test@example.com');
		expect(component.confirmationForm.valid).toBeTrue();
	});
});
