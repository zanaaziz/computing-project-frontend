import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
	selector: 'app-home',
	standalone: false,

	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	exercises = [];

	getRandomExercises(numOfElements: number) {
		const sliceCount = Math.min(numOfElements, this.data.DATA.length);

		const shuffled = this.data.DATA.slice();
		for (let i = shuffled.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
		}

		return shuffled.slice(0, sliceCount);
	}

	onChange() {
		this.exercises = this.getRandomExercises(5);
	}

	constructor(private data: DataService) {
		this.onChange();
	}
}
