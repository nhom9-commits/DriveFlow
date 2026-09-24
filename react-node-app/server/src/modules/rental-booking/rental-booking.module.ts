import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { rentalBookingProviders } from './rental-booking.provider';
import { RentalBookingService } from './rental-booking.service';
import { RentalBookingController } from './rental-booking.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...rentalBookingProviders, RentalBookingService],
  controllers: [RentalBookingController],
  exports: [RentalBookingService],
})
export class RentalBookingModule {}
