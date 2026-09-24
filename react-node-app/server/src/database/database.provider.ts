import { DataSource } from 'typeorm';
import { Vehicle } from '../modules/vehicle/vehicle.entity';
import { Customer } from '../modules/customer/customer.entity';
import { RentalBooking } from '../modules/rental-booking/rental-booking.entity';
import { Payment } from '../modules/payment/payment.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'driveflow',
        entities: [Vehicle, Customer, RentalBooking, Payment],
        synchronize: true, // Tự động đồng bộ cấu trúc bảng từ Entity
      });

      return dataSource.initialize();
    },
  },
];
