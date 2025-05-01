import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ListModule } from './list.module';
import { MomentService } from '../../../core/services/moment.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExerciseModalComponent } from './exercise-modal/exercise-modal.component';
import { of } from 'rxjs';

describe('ListComponent', () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;
	let dialogSpy: jasmine.SpyObj<MatDialog>;

	const sampleLists = [
		{
			list: {
				listId: '1',
				title: 'List 1',
				description: 'Description 1',
				visibility: 'public',
				followerCount: 10,
				createdAt: '2023-01-01T00:00:00Z',
			},
			relationship: 'following',
		},
		{
			list: {
				listId: '2',
				title: 'List 2',
				description: 'Description 2',
				visibility: 'private',
				followerCount: 5,
				createdAt: '2023-02-01T00:00:00Z',
			},
			relationship: 'owned',
		},
	];

	beforeEach(async () => {
		const dialogMock = {
			open: jasmine.createSpy('open').and.returnValue({
				afterClosed: () => of(null),
			}),
		};

		await TestBed.configureTestingModule({
			imports: [ListModule],
			providers: [
				{ provide: MomentService, useValue: { ago: () => 'some time ago' } },
				{ provide: MatDialog, useValue: dialogMock },
				{ provide: ApiService, useValue: {} },
				{ provide: MatSnackBar, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
	});

	it('should create', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('should display list titles', () => {
		component.lists = sampleLists;
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		const titles = compiled.querySelectorAll('.fs-5');
		expect(titles.length).toBe(2);
		expect(titles[0].textContent).toContain('List 1');
		expect(titles[1].textContent).toContain('List 2');
	});

	it('should open exercise modal when onShowExercises is called', () => {
		const sampleList = sampleLists[0];
		component.onShowExercises(sampleList);
		expect(dialogSpy.open).toHaveBeenCalledWith(ExerciseModalComponent, {
			width: '900px',
			maxWidth: '90vw',
			height: '600px',
			maxHeight: '90vh',
			data: { list: sampleList },
		});
	});
});
