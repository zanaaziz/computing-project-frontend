import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../core/services/api.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MomentService } from '../../../../core/services/moment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { ExerciseListModule } from '../exercise-list.module';
import { NEVER, of } from 'rxjs';

describe('CommentsComponent', () => {
	let component: CommentsComponent;
	let fixture: ComponentFixture<CommentsComponent>;

	beforeEach(async () => {
		const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get', 'post']);
		apiServiceSpy.get.and.returnValue(of([])); // Mock get to return an observable of an empty array
		const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuth']);
		const momentServiceSpy = jasmine.createSpyObj('MomentService', ['ago']);
		const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
		const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'backdropClick']);
		dialogRef.backdropClick.and.returnValue(NEVER);

		await TestBed.configureTestingModule({
			imports: [ExerciseListModule],
			providers: [
				{ provide: ApiService, useValue: apiServiceSpy },
				{ provide: AuthService, useValue: authServiceSpy },
				{ provide: MomentService, useValue: momentServiceSpy },
				{ provide: MatSnackBar, useValue: snackBarSpy },
				{ provide: MatDialogRef, useValue: dialogRef },
				{ provide: MAT_DIALOG_DATA, useValue: { exercise: { exerciseId: 1, commentCount: 0 } } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CommentsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have an input form control initialized to empty string', () => {
		expect(component.input).toBeInstanceOf(FormControl);
		expect(component.input.value).toBe('');
	});

	it('should display the correct comment count in the title', () => {
		const titleElement = fixture.nativeElement.querySelector('h2');
		expect(titleElement.textContent).toContain('0 Comments');
	});
});
