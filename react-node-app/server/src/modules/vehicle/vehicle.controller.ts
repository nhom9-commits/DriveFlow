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
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';

@Controller('api/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  // Lấy danh sách tất cả các xe: GET /api/vehicles
  @Get()
  findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  // Xem chi tiết xe theo ID: GET /api/vehicles/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehicleService.findOne(id);
  }

  // Thêm mới xe: POST /api/vehicles
  @Post()
  create(@Body() vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    return this.vehicleService.create(vehicleData);
  }

  // Cập nhật thông tin xe: PUT /api/vehicles/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() vehicleData: Partial<Vehicle>,
  ): Promise<Vehicle> {
    return this.vehicleService.update(id, vehicleData);
  }

  // Xóa xe theo ID: DELETE /api/vehicles/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean; message: string }> {
    return this.vehicleService.remove(id);
  }
}
