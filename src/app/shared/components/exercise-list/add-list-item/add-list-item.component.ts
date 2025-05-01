import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-add-list-item',
	standalone: false,
	templateUrl: './add-list-item.component.html',
	styleUrl: './add-list-item.component.scss',
})
export class AddListItemComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<AddListItemComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private apiService: ApiService,
		private fb: FormBuilder,
		private snack: MatSnackBar
	) {
		dialogRef.disableClose = true;

		dialogRef.backdropClick().subscribe((result) => {
			this.onClose();
		});

		this.newListForm = this.fb.group({
			title: new FormControl(undefined, [Validators.required]),
			description: new FormControl(undefined),
			visibility: new FormControl('public', [Validators.required]),
		});
	}

	newListForm: FormGroup;
	isNewListLoading: boolean = false;
	isListsLoading: boolean = false;
	listSelector: FormControl = new FormControl();
	isExerciseAlreadyAdded: boolean = false;
	lists = null;

	ngOnInit(): void {
		this.getLists();

		this.listSelector.valueChanges.subscribe((listId) => {
			this.dialogRef.updateSize('500px', listId === 'new' ? '460px' : '315px');

			this.isExerciseAlreadyAdded = this.checkIfExerciseAlreadyInList(listId, this.data['exercise']['exerciseId']);
			console.log(this.isExerciseAlreadyAdded);
		});
	}

	checkIfExerciseAlreadyInList(listIdToCheck: string, exerciseIdToCheck: string): boolean {
		return this.lists.some((element) => element.list.listId === listIdToCheck && element.list.exercises.some((ex) => ex.exerciseId === exerciseIdToCheck));
	}

	onClose(): void {
		this.dialogRef.close(this.data);
	}

	getLists() {
		if (this.isListsLoading) return;

		this.isListsLoading = true;

		this.apiService.get('/lists').subscribe({
			next: (response) => {
				this.lists = response.filter((list) => list.relationship === 'owned');
				this.isListsLoading = false;

				if (this.lists.length === 0) {
					this.listSelector.setValue('new');
				}
			},
			error: (error) => {
				this.isListsLoading = false;
			},
			complete() {
				this.isListsLoading = false;
			},
		});
	}

	onAddToExistingList() {
		if (this.isNewListLoading || !this.listSelector.value) return;

		this.isNewListLoading = true;

		let body = {};
		body['exerciseId'] = this.data['exercise']['exerciseId'];

		this.apiService.post(`/lists/${this.listSelector.value}/exercises`, body).subscribe({
			next: () => {
				this.dialogRef.close({ added: true });
				this.isNewListLoading = false;
			},
			error: (error) => {
				this.snack.open('Failed adding to list', null, {
					duration: 5000,
				});

				this.isNewListLoading = false;
			},
		});
	}

	onSubmitNewList() {
		if (this.newListForm.invalid || this.isNewListLoading) return;

		this.isNewListLoading = true;

		let body = this.newListForm.value;
		body['exerciseId'] = this.data['exercise']['exerciseId'];

		if (!body['description']) {
			delete body['description'];
		}

		this.apiService.post('/lists', body).subscribe({
			next: () => {
				this.dialogRef.close({ added: true });
				this.isNewListLoading = false;
			},
			error: (error) => {
				this.snack.open('Failed adding to list', null, {
					duration: 5000,
				});

				this.isNewListLoading = false;
			},
		});
	}
}
