import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { ListModule } from '../../shared/components/list/list.module';

@NgModule({
	declarations: [ListsComponent],
	imports: [CommonModule, ListsRoutingModule, ListModule],
})
export class ListsModule {}
