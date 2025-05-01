import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsComponent } from './lists.component';
import { ApiService } from '../../core/services/api.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListModule } from '../../shared/components/list/list.module';

describe('ListsComponent', () => {
	let component: ListsComponent;
	let fixture: ComponentFixture<ListsComponent>;
	let apiServiceSpy: jasmine.SpyObj<ApiService>;

	beforeEach(async () => {
		const spy = jasmine.createSpyObj('ApiService', ['get']);
		spy.get.and.returnValue(of([]));

		await TestBed.configureTestingModule({
			declarations: [ListsComponent],
			imports: [CommonModule, ListModule],
			providers: [{ provide: ApiService, useValue: spy }],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ListsComponent);
		component = fixture.componentInstance;
		apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call apiService.get with "/lists" on initialization', () => {
		fixture.detectChanges();
		expect(apiServiceSpy.get).toHaveBeenCalledWith('/lists');
	});

	it('should render app-list when isListsLoading is false', () => {
		fixture.detectChanges();
		const listElement = fixture.nativeElement.querySelector('app-list');
		expect(listElement).toBeTruthy();
	});
});
