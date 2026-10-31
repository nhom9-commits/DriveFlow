import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { CategoriesModule } from './modules/categories/categories.module';
import { CostumesModule } from './modules/costumes/costumes.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { RentalsModule } from './modules/rentals/rentals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/backend/.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbUrl = config.get<string>('DATABASE_URL');
        let host = config.get<string>('DB_HOST', 'localhost');
        let port = parseInt(config.get<string>('DB_PORT', '5432'), 10);
        let username = config.get<string>('DB_USERNAME', 'postgres');
        let password = config.get<string>('DB_PASSWORD', 'postgres_password_example');
        let database = config.get<string>('DB_DATABASE', 'cosrent_db');

        if (dbUrl) {
          try {
            const parsed = new URL(dbUrl);
            host = parsed.hostname || host;
            port = parsed.port ? parseInt(parsed.port, 10) : port;
            username = decodeURIComponent(parsed.username || username);
            password = decodeURIComponent(parsed.password || password);
            database = (parsed.pathname || '').replace(/^\//, '') || database;
          } catch (e) {}
        }

        const isCloudPg = host.includes('aivencloud.com') || host.includes('render.com') || host.includes('supabase.co');

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: false,
          ssl: isCloudPg ? { rejectUnauthorized: false } : false,
          extra: isCloudPg ? { ssl: { rejectUnauthorized: false } } : {},
        };
      },
    }),
    CategoriesModule,
    CostumesModule,
    PricingModule,
    AvailabilityModule,
    RentalsModule,
  ],
})
export class AppModule {}
