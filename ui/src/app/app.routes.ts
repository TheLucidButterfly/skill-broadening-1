import { Routes } from '@angular/router';
import { BookingDemo } from './components/booking-demo.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'bookings' },
	{ path: 'bookings', component: BookingDemo },
];
