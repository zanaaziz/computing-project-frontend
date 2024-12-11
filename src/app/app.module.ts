import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { OtpConfirmComponent } from './otp-confirm/otp-confirm.component';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
	declarations: [AppComponent, LoginComponent, RegisterComponent, ProfileComponent, HomeComponent, HeaderComponent, FooterComponent, OtpConfirmComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatButtonModule,
		MatDatepickerModule,
		MatSelectModule,
		MatButtonToggleModule,
		MatToolbarModule,
		MatIconModule,
		MatChipsModule,
		MatSnackBarModule,
	],
	providers: [provideAnimationsAsync(), provideHttpClient(), provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
