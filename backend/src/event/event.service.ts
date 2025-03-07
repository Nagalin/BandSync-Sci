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
    // ค้นหาข้อมูลทั้งหมดจากฐานข้อมูล
    return await this.prisma.event.findMany({
      select: {
        eventId: true,
        eventName: true,     // ชื่อกิจกรรม
        eventDate: true,          // วันที่
        startTime: true,           // เวลา
        endTime: true
      }
    });
  }

  // ฟังก์ชันค้นหา Event ด้วย id
  async findOne(eventId: string) {
    return await this.prisma.event.findUnique({
      where: { 
         eventId
      }
    });
  }

  // ฟังก์ชันค้นหาด้วย eventName
  async findByEventName(eventName: string) {
    return this.prisma.event.findFirst({
      where: { eventName },
    });
  }

  // ฟังก์ชันอัพเดต Event
  async update(eventId: string, eventData: Prisma.EventUpdateInput) {
    return await this.prisma.event.update({
      where: { eventId },
      data: eventData,
    });
  }

  // ฟังก์ชันลบ Event
  async remove(eventId: string) {
    return await this.prisma.event.delete({
      where: { eventId },
    });
  }
}
