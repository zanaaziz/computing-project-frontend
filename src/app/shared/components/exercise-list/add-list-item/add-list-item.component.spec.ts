import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddListItemComponent } from './add-list-item.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('AddListItemComponent', () => {
	let component: AddListItemComponent;
	let fixture: ComponentFixture<AddListItemComponent>;
	let mockApiService: jasmine.SpyObj<ApiService>;
	let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<AddListItemComponent>>;
	let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;
	const mockDialogData = { exercise: { name: 'Push Up', exerciseId: '123' } };

	beforeEach(fakeAsync(() => {
		mockApiService = jasmine.createSpyObj('ApiService', ['get', 'post']);
		mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'backdropClick']);
		mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

		mockMatDialogRef.backdropClick.and.returnValue(of(null));

		TestBed.configureTestingModule({
			declarations: [AddListItemComponent],
			imports: [
				CommonModule,
				ReactiveFormsModule,
				MatDialogModule,
				MatFormFieldModule,
				MatInputModule,
				MatSelectModule,
				MatOptionModule,
				MatIconModule,
				MatButtonModule,
				BrowserAnimationsModule,
			],
			providers: [
				{ provide: ApiService, useValue: mockApiService },
				{ provide: MatDialogRef, useValue: mockMatDialogRef },
				{ provide: MAT_DIALOG_DATA, useValue: mockDialogData },
				{ provide: MatSnackBar, useValue: mockMatSnackBar },
			],
		});

		mockApiService.get.and.returnValue(of([]));

		fixture = TestBed.createComponent(AddListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the dialog title', () => {
		const titleElement = fixture.debugElement.query(By.css('h2[mat-dialog-title]'));
		expect(titleElement).toBeTruthy();
		expect(titleElement.nativeElement.textContent).toContain('Add Exercise to List');
	});

	it('should have a list selector', () => {
		const selectElement = fixture.debugElement.query(By.css('mat-select'));
		expect(selectElement).toBeTruthy();
	});
});
