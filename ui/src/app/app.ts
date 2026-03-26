import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingDemo } from "./components/booking-demo.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookingDemo],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('ui');
}
