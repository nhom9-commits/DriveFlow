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
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Lấy danh sách khách hàng: GET /api/customers
  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  // Xem chi tiết khách hàng: GET /api/customers/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  // Thêm mới khách hàng: POST /api/customers
  @Post()
  create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  // Cập nhật thông tin khách hàng: PUT /api/customers/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() customerData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.update(id, customerData);
  }

  // Xóa khách hàng: DELETE /api/customers/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean; message: string }> {
    return this.customerService.remove(id);
  }
}
