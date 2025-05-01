import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ExerciseModalComponent } from './exercise-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ExerciseModalComponent', () => {
	let component: ExerciseModalComponent;
	let fixture: ComponentFixture<ExerciseModalComponent>;
	let dialogRefMock: jasmine.SpyObj<MatDialogRef<ExerciseModalComponent>>;
	let dataMock: any;

	beforeEach(async () => {
		dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close'], {
			backdropClick: () => of(undefined),
		});
		dataMock = { list: [] };

		await TestBed.configureTestingModule({
			declarations: [ExerciseModalComponent],
			imports: [MatDialogModule, MatIconModule],
			providers: [
				{ provide: MatDialogRef, useValue: dialogRefMock },
				{ provide: MAT_DIALOG_DATA, useValue: dataMock },
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ExerciseModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call onClose when close button is clicked', () => {
		spyOn(component, 'onClose');
		const button = fixture.debugElement.query(By.css('.close-button')).nativeElement;
		button.click();
		expect(component.onClose).toHaveBeenCalled();
	});

	it('should close the dialog with data when onClose is called', () => {
		component.onClose();
		expect(dialogRefMock.close).toHaveBeenCalledWith(dataMock);
	});
});
