import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
	{
		path: '',
		component: ForgotPasswordComponent,
	},
	{
		path: 'confirm',
		component: ConfirmComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
