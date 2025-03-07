import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { Prisma } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { ConflictException } from '@nestjs/common';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  async findAll() {
    try {
      // เรียกใช้ service เพื่อดึงข้อมูล
      return await this.eventService.findAll();
    } catch (error) {
      // จัดการข้อผิดพลาดและส่งข้อความที่เหมาะสม
      console.error(error);
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม');
    }
  }

  @Get(':eventId')
  async findOne(@Param('eventId') eventId: string) {
    try {
      // เรียกใช้ service เพื่อดึงข้อมูลกิจกรรมตาม id
      const event = await this.eventService.findOne(eventId);

      // ถ้าไม่พบข้อมูลกิจกรรม
      if (!event) {
        throw new HttpException(
          'ไม่พบข้อมูลกิจกรรมที่มี id: ' + eventId,
          HttpStatus.NOT_FOUND, // 404 Not Found
        );
      }

      // ถ้าพบข้อมูลกิจกรรม
      return event;
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  @Post()
  async create(@Body() eventData: CreateEventDto) {
    try {
      // ตรวจสอบว่า Event มีอยู่แล้วหรือไม่
      const existingEvent = await this.eventService.findByEventName(eventData.eventName);
      if (existingEvent) {
        throw new ConflictException('ชื่อ Event นี้มีอยู่แล้ว');
      }

      // หากไม่มี Event ที่ชื่อเดียวกัน ให้ทำการสร้าง Event ใหม่
      return await this.eventService.create(eventData);
    } catch (error) {
      console.error(error);

      // ตรวจสอบว่า error เป็น instance ของ ConflictException หรือไม่
      if (error instanceof ConflictException) {
        throw error;
      }

      // จัดการข้อผิดพลาดอื่น ๆ
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการสร้าง Event');
    }
  }

  @Put(':eventId')
  async update(@Param('eventId') eventId: string, @Body() eventData: Prisma.EventUpdateInput) {
    try {
      // เรียกใช้ service เพื่ออัปเดตข้อมูลกิจกรรมตาม id
      const updatedEvent = await this.eventService.update(eventId, eventData);
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error(error);
      // หากเป็นข้อผิดพลาดอื่นๆ เช่นการเชื่อมต่อฐานข้อมูล หรือข้อผิดพลาดในการประมวลผล
      throw new HttpException(
        'เกิดข้อผิดพลาดในการอัปเดตกิจกรรม',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  @Delete(':eventId')
  async remove(@Param('eventId') eventId: string) {
    try {
      // เรียกใช้ service เพื่อทำการลบข้อมูลกิจกรรมตาม id
      await this.eventService.remove(eventId);
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error(error);
      // หากเป็นข้อผิดพลาดอื่นๆ เช่นการเชื่อมต่อฐานข้อมูล หรือข้อผิดพลาดในการประมวลผล
      throw new HttpException(
        'เกิดข้อผิดพลาดในการลบข้อมูลกิจกรรม',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }
}
