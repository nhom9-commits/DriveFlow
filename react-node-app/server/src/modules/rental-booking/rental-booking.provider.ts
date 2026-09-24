import { DataSource } from 'typeorm';
import { RentalBooking } from './rental-booking.entity';

export const rentalBookingProviders = [
  {
    provide: 'RENTAL_BOOKING_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RentalBooking),
    inject: ['DATA_SOURCE'],
  },
];
