import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { EventService } from './event.service';
import { Prisma } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { ConflictException } from '@nestjs/common';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
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
      console.error(error)
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการสร้าง Event');
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() eventData: Prisma.EventUpdateInput) {
    return this.eventService.update(id, eventData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
