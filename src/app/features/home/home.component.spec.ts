import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ExerciseListModule } from '../../shared/components/exercise-list/exercise-list.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomeComponent],
			imports: [ExerciseListModule, HttpClientModule, RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain the exercise list component', () => {
		const exerciseListElement = fixture.nativeElement.querySelector('app-exercise-list');
		expect(exerciseListElement).toBeTruthy();
	});

	it('should display the heading "Exercises"', () => {
		const headingElement = fixture.nativeElement.querySelector('h1');
		expect(headingElement.textContent).toContain('Exercises');
	});
});
