import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  // 1. Hiển thị danh sách tất cả các bản ghi
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      relations: { bookings: true },
    });
  }

  // 2. Hiển thị chi tiết một bản ghi theo ID
  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: { bookings: true },
    });
    if (!vehicle) {
      throw new NotFoundException(`Không tìm thấy xe với ID: ${id}`);
    }
    return vehicle;
  }

  // 3. Thêm mới một bản ghi
  async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const newVehicle = this.vehicleRepository.create(vehicleData);
    return this.vehicleRepository.save(newVehicle);
  }

  // 4. Sửa đổi / Cập nhật một bản ghi cụ thể
  async update(id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    const updated = Object.assign(vehicle, vehicleData);
    return this.vehicleRepository.save(updated);
  }

  // 5. Xóa một bản ghi cụ thể
  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
    return {
      success: true,
      message: `Đã xóa thành công xe có ID ${id}`,
    };
  }
}
