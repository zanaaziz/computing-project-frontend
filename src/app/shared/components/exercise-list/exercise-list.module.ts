import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list.component';
import { MaterialModule } from '../../modules/material.module';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesComponent } from './images/images.component';
import { CommentsComponent } from './comments/comments.component';
import { RouterModule } from '@angular/router';
import { AddListItemComponent } from './add-list-item/add-list-item.component';

@NgModule({
	declarations: [ExerciseListComponent, FiltersComponent, ImagesComponent, CommentsComponent, AddListItemComponent],
	imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
	exports: [ExerciseListComponent],
})
export class ExerciseListModule {}
