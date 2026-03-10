import { IsEmail, IsNotEmpty, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsNotEmpty()
  @IsISO8601()
  appointmentTime: string; // ISO string

  @IsOptional()
  @IsString()
  status?: string;
}
