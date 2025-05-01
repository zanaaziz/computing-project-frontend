import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ExerciseListModule } from '../../shared/components/exercise-list/exercise-list.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, ExerciseListModule],
})
export class HomeModule {}
