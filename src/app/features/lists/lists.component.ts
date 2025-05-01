import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
	selector: 'app-lists',
	standalone: false,
	templateUrl: './lists.component.html',
	styleUrl: './lists.component.scss',
})
export class ListsComponent implements OnInit {
	constructor(private apiService: ApiService) {}

	isListsLoading: boolean = false;
	lists = [];

	ngOnInit(): void {
		this.getLists();
	}

	getLists() {
		if (this.isListsLoading) return;

		this.isListsLoading = true;

		this.apiService.get('/lists').subscribe({
			next: (response) => {
				this.lists = response;
				this.isListsLoading = false;
			},
			error: (error) => {
				this.isListsLoading = false;
			},
			complete() {
				this.isListsLoading = false;
			},
		});
	}
}
