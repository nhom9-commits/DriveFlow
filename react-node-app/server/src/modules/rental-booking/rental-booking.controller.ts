import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RentalBookingService } from './rental-booking.service';
import { RentalBooking } from './rental-booking.entity';

@Controller('api/bookings')
export class RentalBookingController {
  constructor(private readonly bookingService: RentalBookingService) {}

  // Lấy danh sách tất cả đơn đặt xe: GET /api/bookings
  @Get()
  findAll(): Promise<RentalBooking[]> {
    return this.bookingService.findAll();
  }

  // Xem chi tiết đơn đặt xe theo ID: GET /api/bookings/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RentalBooking> {
    return this.bookingService.findOne(id);
  }

  // Thêm mới đơn đặt xe: POST /api/bookings
  @Post()
  create(@Body() bookingData: Partial<RentalBooking>): Promise<RentalBooking> {
    return this.bookingService.create(bookingData);
  }

  // Cập nhật thông tin đơn đặt xe: PUT /api/bookings/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookingData: Partial<RentalBooking>,
  ): Promise<RentalBooking> {
    return this.bookingService.update(id, bookingData);
  }

  // Xóa đơn đặt xe: DELETE /api/bookings/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean; message: string }> {
    return this.bookingService.remove(id);
  }
}
