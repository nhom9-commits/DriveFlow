import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { CustomerModule } from './modules/customer/customer.module';
import { RentalBookingModule } from './modules/rental-booking/rental-booking.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
    VehicleModule,
    CustomerModule,
    RentalBookingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
