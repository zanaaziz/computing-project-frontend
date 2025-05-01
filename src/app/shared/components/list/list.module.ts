import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { MaterialModule } from '../../modules/material.module';
import { ExerciseModalComponent } from './exercise-modal/exercise-modal.component';
import { ExerciseListModule } from '../exercise-list/exercise-list.module';

@NgModule({
	declarations: [ListComponent, ExerciseModalComponent],
	imports: [CommonModule, MaterialModule, ExerciseListModule],
	exports: [ListComponent],
})
export class ListModule {}
