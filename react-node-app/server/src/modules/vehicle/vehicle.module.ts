import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { vehicleProviders } from './vehicle.provider';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...vehicleProviders, VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
