import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RentalBooking } from './rental-booking.entity';

@Injectable()
export class RentalBookingService {
  constructor(
    @Inject('RENTAL_BOOKING_REPOSITORY')
    private readonly bookingRepository: Repository<RentalBooking>,
  ) {}

  // 1. Hiển thị danh sách tất cả các đơn đặt xe (kèm quan hệ Customer, Vehicle, Payments)
  async findAll(): Promise<RentalBooking[]> {
    return this.bookingRepository.find({
      relations: {
        customer: true,
        vehicle: true,
        payments: true,
      },
    });
  }

  // 2. Hiển thị chi tiết đơn đặt xe theo ID
  async findOne(id: number): Promise<RentalBooking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        vehicle: true,
        payments: true,
      },
    });
    if (!booking) {
      throw new NotFoundException(`Không tìm thấy đơn đặt xe với ID: ${id}`);
    }
    return booking;
  }

  // 3. Thêm mới đơn đặt xe
  async create(bookingData: Partial<RentalBooking>): Promise<RentalBooking> {
    const newBooking = this.bookingRepository.create(bookingData);
    return this.bookingRepository.save(newBooking);
  }

  // 4. Cập nhật thông tin đơn đặt xe
  async update(id: number, bookingData: Partial<RentalBooking>): Promise<RentalBooking> {
    const booking = await this.findOne(id);
    const updated = Object.assign(booking, bookingData);
    return this.bookingRepository.save(updated);
  }

  // 5. Xóa đơn đặt xe
  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const booking = await this.findOne(id);
    await this.bookingRepository.remove(booking);
    return {
      success: true,
      message: `Đã xóa thành công đơn đặt xe có ID ${id}`,
    };
  }
}
