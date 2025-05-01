import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-exercise-modal',
	standalone: false,
	templateUrl: './exercise-modal.component.html',
	styleUrl: './exercise-modal.component.scss',
})
export class ExerciseModalComponent {
	constructor(public dialogRef: MatDialogRef<ExerciseModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
		dialogRef.disableClose = true;

		dialogRef.backdropClick().subscribe((result) => {
			this.onClose();
		});
	}

	onClose(): void {
		this.dialogRef.close(this.data);
	}
}
