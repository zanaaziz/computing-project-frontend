import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [RegisterComponent],
	imports: [CommonModule, RegisterRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class RegisterModule {}
