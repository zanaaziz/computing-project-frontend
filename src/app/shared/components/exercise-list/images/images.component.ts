import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-images',
	standalone: false,
	templateUrl: './images.component.html',
	styleUrl: './images.component.scss',
})
export class ImagesComponent implements OnInit, OnDestroy {
	@Input() images: string[] = [];
	currentImage: string;
	private intervalId: any;
	private currentIndex: number = 0;

	ngOnInit() {
		if (this.images.length > 0) {
			this.currentImage = this.images[0];
			if (this.images.length > 1) {
				this.intervalId = setInterval(() => {
					this.currentIndex = (this.currentIndex + 1) % this.images.length;
					this.currentImage = this.images[this.currentIndex];
				}, 1500);
			}
		}
	}

	ngOnDestroy() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}
}
