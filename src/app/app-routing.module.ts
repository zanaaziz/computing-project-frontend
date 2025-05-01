import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'exercises', loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule) },
	{ path: 'auth/login', loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule) },
	{ path: 'auth/register', loadChildren: () => import('./features/register/register.module').then((m) => m.RegisterModule) },
	{ path: 'auth/otp-confirm', loadChildren: () => import('./features/otp-confirm/otp-confirm.module').then((m) => m.OtpConfirmModule) },
	{ path: 'auth/forgot-password', loadChildren: () => import('./features/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule) },
	{ path: 'profile', loadChildren: () => import('./features/profile/profile.module').then((m) => m.ProfileModule) },
	{ path: 'lists', loadChildren: () => import('./features/lists/lists.module').then((m) => m.ListsModule) },
	{
		path: '',
		redirectTo: 'exercises',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
