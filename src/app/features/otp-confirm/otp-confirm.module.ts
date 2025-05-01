import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpConfirmRoutingModule } from './otp-confirm-routing.module';
import { OtpConfirmComponent } from './otp-confirm.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [OtpConfirmComponent],
	imports: [CommonModule, OtpConfirmRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class OtpConfirmModule {}
