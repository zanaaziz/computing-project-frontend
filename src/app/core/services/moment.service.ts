import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
	providedIn: 'root',
})
export class MomentService {
	constructor() {}

	ago(timestamp: string): string {
		moment.locale('en');
		var time = moment.utc(timestamp).fromNow();
		return time.charAt(0).toUpperCase() + time.slice(1);
	}

	fifference(a: string, b: string): number {
		moment.locale('en');
		return moment(a).diff(b, 'months');
	}
}
