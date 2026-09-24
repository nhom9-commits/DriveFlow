import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RentalBooking } from '../rental-booking/rental-booking.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 50, unique: true })
  driverLicense: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @OneToMany(() => RentalBooking, (booking) => booking.customer)
  bookings: RentalBooking[];
}
