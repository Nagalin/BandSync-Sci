import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  // ฟังก์ชันสร้าง Event
  async create(eventData: Prisma.EventCreateInput) {
    let eventDate: DateTime;

    if (typeof eventData.eventDate === 'string') {
      eventDate = DateTime.fromISO(eventData.eventDate);
      if (!eventDate.isValid) {
        throw new Error('Invalid eventDate format. Expected yyyy-MM-dd');
      }
    } else if (eventData.eventDate instanceof Date) {
      eventDate = DateTime.fromJSDate(eventData.eventDate);
    } else {
      throw new Error('eventDate must be a valid string or Date');
    }

    let startTime: DateTime;
    let endTime: DateTime;

    if (typeof eventData.startTime === 'string') {
      const [startHour, startMinute] = eventData.startTime.split(':');
      startTime = eventDate.set({ hour: Number(startHour), minute: Number(startMinute) });
    } else {
      throw new Error('startTime must be a valid string in HH:mm format');
    }

    if (typeof eventData.endTime === 'string') {
      const [endHour, endMinute] = eventData.endTime.split(':');
      endTime = eventDate.set({ hour: Number(endHour), minute: Number(endMinute) });
    } else {
      throw new Error('endTime must be a valid string in HH:mm format');
    }

    return this.prisma.event.create({
      data: {
        eventName: eventData.eventName,
        eventDate: eventDate.toJSDate(),
        startTime: startTime.toJSDate(),
        endTime: endTime.toJSDate(),
        dressCode: eventData.dressCode,
        additionalDetails: eventData.additionalDetails,
      },
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
