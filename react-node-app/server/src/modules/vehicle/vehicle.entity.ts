import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RentalBooking } from '../rental-booking/rental-booking.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  plateNumber: string;

  @Column({ length: 50 })
  brand: string;

  @Column({ length: 50 })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerDay: number;

  @Column({ length: 20, default: 'AVAILABLE' })
  status: string; // AVAILABLE, RENTED, MAINTENANCE

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @OneToMany(() => RentalBooking, (booking) => booking.vehicle)
  bookings: RentalBooking[];
}
