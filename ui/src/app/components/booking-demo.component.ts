import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { finalize } from 'rxjs/operators';
import { HealthResponse } from '../models/health';
import { Booking } from '../models/booking';

@Component({
  selector: 'booking-demo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div style="margin-top:1rem; padding:1rem; border:1px dashed #ddd; border-radius:8px;">
      <h3>API Health Check</h3>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button (click)="callHealth()">Call API /health</button>
      </div>
      <pre style="margin-top:0.75rem; max-height:300px; overflow:auto; background:#fafafa; padding:0.75rem;">{{output}}</pre>

      <hr />
      <h3>Create Booking</h3>
      <form #f="ngForm" (ngSubmit)="createBooking()" style="display:flex; flex-direction:column; gap:0.5rem; max-width:420px;">
        <input name="customerName" placeholder="Name" [(ngModel)]="customerName" required [disabled]="creating" />
        <input name="customerEmail" type="email" placeholder="Email" [(ngModel)]="customerEmail" required [disabled]="creating" />
        <input name="appointmentTime" type="datetime-local" [(ngModel)]="appointmentTime" [disabled]="creating" />
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <button type="submit" [disabled]="f.invalid || creating">{{ creating ? 'Submitting…' : 'Submit Booking' }}</button>
          <button type="button" (click)="loadBookings()" [disabled]="creating">Refresh List</button>
          <span *ngIf="creating" style="font-size:0.9rem; color:#666;">Submitting…</span>
        </div>
      </form>

      <h4 style="margin-top:1rem;">Bookings</h4>
      <div *ngIf="bookings.length === 0">No bookings yet.</div>
      <div *ngIf="bookings.length > 0">Total: {{bookings.length}}</div>
      <ul>
        <li *ngFor="let b of bookings">{{ b.customerName }} — {{ b.customerEmail }} — {{ b.appointmentTime ? (b.appointmentTime | date:'short') : (b.createdAt | date:'short') }}</li>
      </ul>
    </div>
  `,
})
export class BookingDemo {
  output = '';
  testValue = 0;
  loading = false;
  bookings: Booking[] = [];
  customerName = '';
  customerEmail = '';
  appointmentTime = '';
  creating = false;

  constructor(private cdr: ChangeDetectorRef, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  callHealth() {
    this.loading = true;
    this.output = '';
    this.bookingService
      .health()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (health: HealthResponse) => {
          this.output = JSON.stringify(health, null, 2);
        },
        error: (err: any) => {
          this.output = 'Error: ' + (err?.message || String(err));
        },
      });
  }

  loadBookings() {
    this.bookingService
      .list()
      .pipe(
        finalize(() => {
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (list) => (this.bookings = list || []),
        error: (err) => (this.output = 'List error: ' + (err?.message || String(err))),
      });
  }

  createBooking() {
    if (!this.customerName || !this.customerEmail) {
      this.output = 'Name and email are required.';
      return;
    }

    this.creating = true;
    const payload = {
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      appointmentTime: this.appointmentTime || new Date().toISOString(),
    };

    this.bookingService
      .create(payload)
      .pipe(
        finalize(() => {
          this.creating = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (b) => {
          this.output = 'Created booking: ' + b.id;
          this.customerName = '';
          this.customerEmail = '';
          this.appointmentTime = '';
          this.loadBookings();
        },
        error: (err) => (this.output = 'Create error: ' + (err?.message || String(err))),
      });
  }

  testButton() {
    this.testValue++;
  }
}
  