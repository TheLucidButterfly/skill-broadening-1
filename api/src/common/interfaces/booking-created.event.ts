export interface BookingCreatedEvent {
  id: string;
  customerName: string;
  customerEmail: string;
  appointmentTime: string; // ISO
  status: string;
  createdAt: string;
}
