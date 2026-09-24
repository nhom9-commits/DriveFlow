import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // 1. Hiển thị danh sách khách hàng
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      relations: { bookings: true },
    });
  }

  // 2. Hiển thị chi tiết khách hàng theo ID
  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: { bookings: true },
    });
    if (!customer) {
      throw new NotFoundException(`Không tìm thấy khách hàng với ID: ${id}`);
    }
    return customer;
  }

  // 3. Thêm mới một khách hàng
  async create(customerData: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customerData);
    return this.customerRepository.save(newCustomer);
  }

  // 4. Cập nhật thông tin khách hàng
  async update(id: number, customerData: Partial<Customer>): Promise<Customer> {
    const customer = await this.findOne(id);
    const updated = Object.assign(customer, customerData);
    return this.customerRepository.save(updated);
  }

  // 5. Xóa khách hàng
  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
    return {
      success: true,
      message: `Đã xóa thành công khách hàng có ID ${id}`,
    };
  }
}
