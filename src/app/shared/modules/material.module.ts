import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatButtonModule,
		MatDatepickerModule,
		MatDialogModule,
		MatSelectModule,
		MatButtonToggleModule,
		MatToolbarModule,
		MatIconModule,
		MatChipsModule,
		MatSnackBarModule,
		MatExpansionModule,
	],
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatButtonModule,
		MatDialogModule,
		MatDatepickerModule,
		MatSelectModule,
		MatButtonToggleModule,
		MatToolbarModule,
		MatIconModule,
		MatChipsModule,
		MatSnackBarModule,
		MatExpansionModule,
	],
})
export class MaterialModule {}
