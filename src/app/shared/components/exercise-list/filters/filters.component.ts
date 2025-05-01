import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-filters',
	standalone: false,
	templateUrl: './filters.component.html',
	styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
	constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
		this.form = this.fb.group({
			aiQuery: [this.route.snapshot.queryParams['aiQuery']],
			name: [this.route.snapshot.queryParams['name']],
			muscle: [this.ensureArray(this.route.snapshot.queryParams['muscle'])],
			equipment: [this.ensureArray(this.route.snapshot.queryParams['equipment'])],
			category: [this.ensureArray(this.route.snapshot.queryParams['category'])],
			force: [this.ensureArray(this.route.snapshot.queryParams['force'])],
			level: [this.ensureArray(this.route.snapshot.queryParams['level'])],
			mechanic: [this.ensureArray(this.route.snapshot.queryParams['mechanic'])],
		});

		// If any query param other than page is present, mark form as dirty.
		if (Object.keys(this.route.snapshot.queryParams).filter((key) => key !== 'page').length > 0) {
			this.form.markAsDirty();
		}
	}

	previousAiQueryValue: string;

	@Input() set aiResult(val: Object) {
		if (!val) {
			this.form.controls['aiQuery'].patchValue(undefined, { emitEvent: false });
			return;
		}

		this.form.controls['aiQuery'].patchValue(val['query'], { emitEvent: false });

		for (const [key, value] of Object.entries(val['filters'])) {
			this.form.controls[key].patchValue(value, { emitEvent: false });
		}
	}

	ensureArray(value) {
		if (!value) {
			return value;
		}

		return Array.isArray(value) ? value : [value];
	}

	form: FormGroup;

	muscleOptions = [
		'abdominals',
		'abductors',
		'adductors',
		'biceps',
		'calves',
		'chest',
		'forearms',
		'glutes',
		'hamstrings',
		'lats',
		'lower back',
		'middle back',
		'neck',
		'quadriceps',
		'shoulders',
		'traps',
		'triceps',
	];

	equipmentOptions = [
		'bands',
		'barbell',
		'body only',
		'cable',
		'dumbbell',
		'e-z curl bar',
		'exercise ball',
		'foam roll',
		'kettlebells',
		'machine',
		'medicine ball',
		'other',
	];

	categoryOptions = ['cardio', 'olympic weightlifting', 'plyometrics', 'powerlifting', 'strength', 'stretching', 'strongman'];
	forceOptions = ['pull', 'push', 'static'];
	levelOptions = ['beginner', 'expert', 'intermediate'];
	mechanicOptions = ['compound', 'isolation'];

	ngOnInit(): void {
		this.form.valueChanges.pipe(debounceTime(1000)).subscribe((result: Object) => {
			// If the initial search was with AI but then the user fine tuned it with manual filters, remove the AI query and only use manual filter values.
			if (result['aiQuery'] === this.previousAiQueryValue) {
				this.form.controls['aiQuery'].patchValue(undefined, { emitEvent: false });
				delete result['aiQuery'];
			} else {
				// Keep track of the AI field value on each iteration.
				this.previousAiQueryValue = result['aiQuery'];
			}

			this.router.navigate(['/'], { queryParams: result, relativeTo: this.route });
		});
	}
}
