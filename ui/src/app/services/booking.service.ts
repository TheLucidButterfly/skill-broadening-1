import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Booking } from '../models/booking';
import { map, catchError, timeout } from 'rxjs/operators';
import { getApiBase } from '../config/api.config';
import { HealthResponse } from '../models/health';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private base = '/api'; // proxy or dev server will route

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

  /**
   * Health endpoint helper.
   * Performs the HTTP request with timeout and maps errors into a
   * normalized payload so callers only need to handle a single shape.
   */
  health(): Observable<HealthResponse> {
    const url = `${getApiBase()}/health`;

    return this.http.get(url, { observe: 'response' }).pipe(
      timeout(5000),
      map((res: any) => res?.body as HealthResponse),
      catchError((err) => {
        const message = err && err.name === 'TimeoutError' ? 'request timed out (5s)' : err?.message || JSON.stringify(err);
        return throwError(() => new Error(message));
      })
    );
  }
}
