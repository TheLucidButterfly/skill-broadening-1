import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private base = '/api'; // proxy or docker-compose will route

  constructor(private http: HttpClient) {}

  create(payload: { customerName: string; customerEmail: string; appointmentTime: string }): Observable<Booking> {
    return this.http.post<Booking>(`${this.base}/bookings`, payload);
  }

  list(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.base}/bookings`);
  }

  get(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.base}/bookings/${id}`);
  }
}
