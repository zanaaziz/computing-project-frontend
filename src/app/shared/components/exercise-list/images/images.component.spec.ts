import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ImagesComponent } from './images.component';

describe('ImagesComponent', () => {
	let component: ImagesComponent;
	let fixture: ComponentFixture<ImagesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ImagesComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ImagesComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set currentImage to the first image when there is one image', () => {
		component.images = ['img1.jpg'];
		fixture.detectChanges();
		expect(component.currentImage).toBe('img1.jpg');
	});

	it('should cycle images every 1.5 seconds when there are multiple images', fakeAsync(() => {
		component.images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
		fixture.detectChanges();
		expect(component.currentImage).toBe('img1.jpg');

		tick(1500);
		expect(component.currentImage).toBe('img2.jpg');

		tick(1500);
		expect(component.currentImage).toBe('img3.jpg');

		tick(1500);
		expect(component.currentImage).toBe('img1.jpg');
	}));
});
