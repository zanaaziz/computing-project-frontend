import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ListModule } from '../../shared/components/list/list.module';
import { FollowersModule } from '../../shared/components/followers/followers.module';

@NgModule({
	declarations: [ProfileComponent, ChangeEmailComponent, ChangePasswordComponent, DeleteAccountComponent],
	imports: [CommonModule, ProfileRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule, ListModule, FollowersModule],
})
export class ProfileModule {}
