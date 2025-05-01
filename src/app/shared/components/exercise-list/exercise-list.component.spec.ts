import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseListComponent } from './exercise-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('ExerciseListComponent', () => {
	let component: ExerciseListComponent;
	let fixture: ComponentFixture<ExerciseListComponent>;

	const mockApiService = {
		get: jasmine.createSpy('get').and.returnValue(of({ data: [], total: 0 })),
		post: jasmine.createSpy('post').and.returnValue(of({})),
		delete: jasmine.createSpy('delete').and.returnValue(of({})),
	};

	const mockActivatedRoute = {
		queryParams: of({}),
	};

	const mockAuthService = {
		isAuth: jasmine.createSpy('isAuth').and.returnValue(true),
	};

	const mockMatDialog = {
		open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of({}) }),
	};

	const mockMatSnackBar = {
		open: jasmine.createSpy('open'),
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ExerciseListComponent],
			providers: [
				{ provide: ApiService, useValue: mockApiService },
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: AuthService, useValue: mockAuthService },
				{ provide: MatDialog, useValue: mockMatDialog },
				{ provide: MatSnackBar, useValue: mockMatSnackBar },
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ExerciseListComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have initial state', () => {
		expect(component.exercises).toEqual([]);
		expect(component.queryParams).toEqual({});
		expect(component.currentPage).toBe(1);
		expect(component.total).toBe(0);
		expect(component.isLoading).toBe(false);
		expect(component.hasMore).toBe(true);
		expect(component.aiResult).toBeUndefined();
	});

	it('should set exercises from list input', () => {
		const mockList: any = { list: { exercises: [{ name: 'Exercise 1' }, { name: 'Exercise 2' }] } };
		component.list = mockList;
		fixture.detectChanges();
		expect(component.exercises).toEqual(mockList.list.exercises);
	});
});
