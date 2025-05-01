import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { authInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
	declarations: [AppComponent, HeaderComponent, FooterComponent],
	imports: [BrowserModule, AppRoutingModule, MatButtonModule, MatIconModule],
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([authInterceptor])),
		provideNativeDateAdapter(),
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
