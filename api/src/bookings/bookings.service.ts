import { Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './interfaces/booking.interface';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [];

  list(): Booking[] {
    return this.bookings.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  create(dto: CreateBookingDto): Booking {
    const booking: Booking = {
      id: Date.now().toString(),
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      appointmentTime: dto.appointmentTime,
      createdAt: new Date().toISOString(),
    };
    this.bookings.push(booking);
    return booking;
  }

  get(id: string): Booking {
    const found = this.bookings.find((b) => b.id === id);
    if (!found) throw new NotFoundException('Booking not found');
    return found;
  }
}
