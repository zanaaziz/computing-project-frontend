import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpConfirmComponent } from './otp-confirm.component';

const routes: Routes = [
	{
		path: '',
		component: OtpConfirmComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OtpConfirmRoutingModule {}
