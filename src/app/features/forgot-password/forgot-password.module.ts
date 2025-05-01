import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
	declarations: [ForgotPasswordComponent, ConfirmComponent],
	imports: [CommonModule, ForgotPasswordRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class ForgotPasswordModule {}
