import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BookingService } from '../services/booking.service';
import { finalize } from 'rxjs/operators';
import { HealthResponse } from '../models/health';

@Component({
  selector: 'booking-demo',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="margin-top:1rem; padding:1rem; border:1px dashed #ddd; border-radius:8px;">
      <h3>API Health Check</h3>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button (click)="callHealth()">Call API /health</button>
        <button (click)="testButton()">Test button</button>
      </div>
      <pre style="margin-top:0.75rem; max-height:300px; overflow:auto; background:#fafafa; padding:0.75rem;">{{output}}</pre>
      {{testValue}}
    </div>
  `,
})
export class BookingDemo {
  output = '';
  testValue = 0;
  loading = false;

  constructor(private cdr: ChangeDetectorRef, private bookingService: BookingService) {}

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

  testButton() {
    this.testValue++;
  }
}
  