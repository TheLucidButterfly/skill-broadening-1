import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { EventsService } from '../events/events.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private events: EventsService,
  ) {}

  async create(dto: CreateBookingDto) {
    const booking = this.repo.create({
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      appointmentTime: new Date(dto.appointmentTime),
      status: dto.status || 'scheduled',
    });
    const saved = await this.repo.save(booking);

    // Publish an event for other systems to consume
    const payload = {
      id: saved.id,
      customerName: saved.customerName,
      customerEmail: saved.customerEmail,
      appointmentTime: saved.appointmentTime.toISOString(),
      status: saved.status,
      createdAt: saved.createdAt.toISOString(),
    };
    await this.events.publish('booking.created', payload);

    return saved;
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
}
