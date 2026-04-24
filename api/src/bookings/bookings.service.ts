import { Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './interfaces/booking.interface';
import { CreateBookingDto } from './dto/create-booking.dto';
import { EventsService } from '../events/events.service';
import { Topics } from '../events/topics';

interface BookingCreatedEvent {
  eventId: string;
  booking: Booking;
}

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [];

  constructor(private readonly eventsService: EventsService) {}

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

    // publish event (best-effort)
    const evt: BookingCreatedEvent = { eventId: `${booking.id}-${Date.now()}`, booking };
    try {
      this.eventsService.emit(Topics.BookingCreated, evt);
    } catch (err) {
      // swallow: events are best-effort in this dev setup
      console.warn('BookingsService: failed to emit event', err?.message || err);
    }

    return booking;
  }

  get(id: string): Booking {
    const found = this.bookings.find((b) => b.id === id);
    if (!found) throw new NotFoundException('Booking not found');
    return found;
  }
}
