import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Payment } from '../payment/payment.entity';

@Entity('rental_bookings')
export class RentalBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  vehicleId: number;

  @ManyToOne(() => Customer, (customer) => customer.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ length: 20, default: 'PENDING' })
  status: string; // PENDING, CONFIRMED, COMPLETED, CANCELLED

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];
}
