import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListModule } from '../../shared/components/list/list.module';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileComponent', () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProfileComponent],
			imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, ListModule, HttpClientModule],
			providers: [
				{ provide: ApiService, useClass: MockApiService },
				{ provide: AuthService, useClass: MockAuthService },
				{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) } },
				{ provide: MatDialog, useClass: MockMatDialog },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the profile name', async () => {
		await fixture.whenStable();
		fixture.detectChanges();
		const nameElement = fixture.debugElement.query(By.css('h1')).nativeElement;
		expect(nameElement.textContent).toContain('Test User');
	});

	it('should disable follow button for self profile', async () => {
		await fixture.whenStable();
		fixture.detectChanges();
		const followButton = fixture.debugElement.query(By.css('button[mat-flat-button]')).nativeElement;
		expect(followButton.disabled).toBe(true);
	});
});

class MockApiService {
	get(url: string, options?: any) {
		if (url === '/users/me') {
			return of({
				userId: '123',
				name: 'Test User',
				profilePhotoUrl: '',
				coverPhotoUrl: '',
				followerCount: 0,
			});
		} else if (url === '/followers') {
			return of({ followers: [], followings: [] });
		} else if (url === '/lists') {
			return of([]);
		} else {
			throw new Error(`Unhandled URL in MockApiService: ${url}`);
		}
	}
}

class MockAuthService {
	getUser() {
		return { userId: '123' };
	}
}

class MockMatDialog {
	open() {
		return { afterClosed: () => of({}) };
	}
}
