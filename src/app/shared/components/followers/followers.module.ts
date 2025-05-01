import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersComponent } from './followers.component';
import { MaterialModule } from '../../modules/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [FollowersComponent],
	imports: [CommonModule, MaterialModule, RouterModule],
})
export class FollowersModule {}
