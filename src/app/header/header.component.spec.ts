import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { AuthService } from '../core/services/auth.service';

class MockAuthService {
	isAuth(): boolean {
		return false;
	}
	logout(): void {}
}

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let authService: MockAuthService;

	beforeEach(() => {
		authService = new MockAuthService();
		TestBed.configureTestingModule({
			declarations: [HeaderComponent],
			imports: [RouterTestingModule, MatButtonModule],
			providers: [{ provide: AuthService, useValue: authService }],
		});
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show login and register buttons when not authenticated', () => {
		spyOn(authService, 'isAuth').and.returnValue(false);
		fixture.detectChanges();
		const loginButton = fixture.debugElement.query(By.css('button[routerLink="/auth/login"]'));
		const registerButton = fixture.debugElement.query(By.css('button[routerLink="/auth/register"]'));
		const profileButton = fixture.debugElement.query(By.css('button[routerLink="/profile"]'));
		const buttons = fixture.debugElement.queryAll(By.css('button'));
		const logoutButton = buttons.find((button) => button.nativeElement.textContent.includes('Logout'));
		expect(loginButton).toBeTruthy();
		expect(registerButton).toBeTruthy();
		expect(profileButton).toBeNull();
		expect(logoutButton).toBeUndefined();
	});

	it('should show profile and logout buttons when authenticated', () => {
		spyOn(authService, 'isAuth').and.returnValue(true);
		fixture.detectChanges();
		const loginButton = fixture.debugElement.query(By.css('button[routerLink="/auth/login"]'));
		const registerButton = fixture.debugElement.query(By.css('button[routerLink="/auth/register"]'));
		const profileButton = fixture.debugElement.query(By.css('button[routerLink="/profile"]'));
		const buttons = fixture.debugElement.queryAll(By.css('button'));
		const logoutButton = buttons.find((button) => button.nativeElement.textContent.includes('Logout'));
		expect(loginButton).toBeNull();
		expect(registerButton).toBeNull();
		expect(profileButton).toBeTruthy();
		expect(logoutButton).toBeDefined();
	});
});
