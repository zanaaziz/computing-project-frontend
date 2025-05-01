import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';
import { FollowersComponent } from './followers.component';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { of } from 'rxjs';

describe('FollowersComponent', () => {
	let component: FollowersComponent;
	let fixture: ComponentFixture<FollowersComponent>;
	let mockApiService: any;
	let mockAuthService: any;
	let mockDialogRef: any;

	const mockUser = {
		userId: '123',
		name: 'Test User',
		profilePhotoUrl: '/assets/images/placeholders/cover-placeholder.png',
	};

	const mockFollowers = [mockUser];
	const mockFollowings = [mockUser];

	const mockData = {
		show: 'followers',
		profile: { userId: '123', followerCount: 1 },
		followers: mockFollowers,
		followings: mockFollowings,
	};

	beforeEach(async () => {
		mockApiService = jasmine.createSpyObj('ApiService', ['get', 'post', 'delete']);
		mockAuthService = { getUser: () => ({ userId: '123' }) };
		mockDialogRef = { close: () => {}, disableClose: true, backdropClick: () => of(null) };

		await TestBed.configureTestingModule({
			imports: [CommonModule, MaterialModule, RouterTestingModule],
			declarations: [FollowersComponent],
			providers: [
				{ provide: ApiService, useValue: mockApiService },
				{ provide: AuthService, useValue: mockAuthService },
				{ provide: MatDialogRef, useValue: mockDialogRef },
				{ provide: MAT_DIALOG_DATA, useValue: mockData },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FollowersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set the title to "1 Followers" when showing followers', () => {
		const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
		expect(titleElement.textContent).toContain('1 Followers');
	});

	it('should render the list of followers', () => {
		const userElements = fixture.debugElement.queryAll(By.css('.mb-3.d-flex.justify-content-between.align-items-center'));
		expect(userElements.length).toBe(1);
	});
});
