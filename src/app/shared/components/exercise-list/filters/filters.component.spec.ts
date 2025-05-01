import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../modules/material.module';

describe('FiltersComponent', () => {
	let component: FiltersComponent;
	let fixture: ComponentFixture<FiltersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FiltersComponent],
			imports: [ReactiveFormsModule, MaterialModule],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							queryParams: {},
						},
					},
				},
				{
					provide: Router,
					useValue: { navigate: jasmine.createSpy('navigate') },
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have form controls', () => {
		expect(component.form.contains('aiQuery')).toBeTrue();
		expect(component.form.contains('name')).toBeTrue();
		expect(component.form.contains('muscle')).toBeTrue();
		expect(component.form.contains('equipment')).toBeTrue();
		expect(component.form.contains('category')).toBeTrue();
		expect(component.form.contains('force')).toBeTrue();
		expect(component.form.contains('level')).toBeTrue();
		expect(component.form.contains('mechanic')).toBeTrue();
	});

	it('should correctly ensure array', () => {
		expect(component.ensureArray('chest')).toEqual(['chest']);
		expect(component.ensureArray(['chest', 'back'])).toEqual(['chest', 'back']);
		expect(component.ensureArray(undefined)).toBeUndefined();
	});
});
