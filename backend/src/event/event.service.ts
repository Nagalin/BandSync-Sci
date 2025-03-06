import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) { }

  // ฟังก์ชันสร้าง Event
  async create(eventData: Prisma.EventCreateInput) {
    const {
      eventName,
      eventDate,
      startTime,
      endTime,
      dressCode,
      additionalDetails
    } = eventData

    await this.prisma.event.create({
      data: {
        eventName: eventName,
        eventDate: eventDate,
        startTime: startTime,
        endTime: endTime,
        dressCode: dressCode,
        additionalDetails: additionalDetails ? additionalDetails : "-"
      }
    });
  }

  // ฟังก์ชันค้นหาทุก Event
  async findAll() {
    return this.prisma.event.findMany();
  }

  // ฟังก์ชันค้นหา Event ด้วย id
  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  // ฟังก์ชันค้นหาด้วย eventName
  async findByEventName(eventName: string) {
    return this.prisma.event.findFirst({
      where: { eventName },
    });
  }

  // ฟังก์ชันอัพเดต Event
  async update(id: string, eventData: Prisma.EventUpdateInput) {
    return this.prisma.event.update({
      where: { id },
      data: eventData,
    });
  }

  // ฟังก์ชันลบ Event
  async remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
