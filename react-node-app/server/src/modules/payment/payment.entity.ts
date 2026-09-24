import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { RentalBooking } from '../rental-booking/rental-booking.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: number;

  @ManyToOne(() => RentalBooking, (booking) => booking.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  booking: RentalBooking;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ length: 30, default: 'CREDIT_CARD' })
  paymentMethod: string; // CREDIT_CARD, BANK_TRANSFER, CASH

  @Column({ length: 20, default: 'PAID' })
  status: string; // PENDING, PAID, FAILED

  @CreateDateColumn()
  paymentDate: Date;
}
