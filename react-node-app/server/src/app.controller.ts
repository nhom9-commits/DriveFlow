import { Controller, Get, Post, Query, Body, Headers } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: 'DriveFlow NestJS API is running!',
      project: 'DriveFlow - Quản lý đặt & cho thuê xe (Car Rental & Fleet Management)',
      endpoints: [
        '/api/vehicles',
        '/api/customers',
        '/api/bookings',
        '/api/data',
      ],
    };
  }

  // Tương thích với frontend Next.js (/api/data)
  @Get('api/data')
  getData() {
    return {
      message: 'Hello from DriveFlow NestJS Server!',
      status: 'success',
      timestamp: new Date().toISOString(),
      entities: ['Vehicle', 'Customer', 'RentalBooking', 'Payment'],
    };
  }

  // Tương thích với route GET /api/get từ bài trước
  @Get('api/get')
  getParam(@Query('id') id: string) {
    return {
      message: 'This is a GET request!',
      param: id || null,
    };
  }

  // Tương thích với route POST /api/post từ bài trước
  @Post('api/post')
  postData(
    @Query('id') param: string,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    const idHeader = headers['idheader'];
    return {
      message: 'This is a POST request!',
      param: param || null,
      body: body || {},
      idHeader: idHeader || null,
    };
  }
}
