import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { customerProviders } from './customer.provider';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...customerProviders, CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
