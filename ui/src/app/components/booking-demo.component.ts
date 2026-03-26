import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { timeout, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  callHealth() {
    this.loading = true;
    this.output = 'calling http://localhost:3000/health...';
    this.http
      .get('http://localhost:3000/health', { observe: 'response' })
      .pipe(
        timeout(5000),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res: any) => {
          this.output = JSON.stringify(res.body, null, 2);
        },
        error: (err) => {
          if (err && err.name === 'TimeoutError') {
            this.output = 'Error: request timed out (5s)';
          } else {
            this.output = 'Error: ' + (err.message || JSON.stringify(err));
          }
        },

      });
  }

  testButton() {
    this.testValue++;
  }
}
  