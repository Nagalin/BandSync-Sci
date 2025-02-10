import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { Prisma } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany();
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async findByEventName(eventName: string) {
    return this.prisma.event.findFirst({
      where: { eventName },
    });
  }

  async create(eventData: Prisma.EventCreateInput) {
    let eventDate: Date;

    if (typeof eventData.eventDate === 'string') {
      eventDate = new Date(eventData.eventDate);  
      if (isNaN(eventDate.getTime())) {
        throw new Error('Invalid eventDate format. Expected yyyy-MM-dd');
      }
    } else {
      throw new Error('eventDate is required and must be a valid string');
    }

    return this.prisma.event.create({
      data: {
        ...eventData,
        eventDate,
      },
    });
  }

  async update(id: string, eventData: Prisma.EventUpdateInput) {
    if (eventData.eventDate) {
      if (typeof eventData.eventDate === 'string') {
        const eventDate = new Date(eventData.eventDate);
        if (isNaN(eventDate.getTime())) {
          throw new Error('Invalid eventDate format. Expected yyyy-MM-dd');
        }
        eventData.eventDate = eventDate;
      } else {
        throw new Error('eventDate must be a valid string');
      }
    }

    return this.prisma.event.update({
      where: { id },
      data: eventData,
    });
  }

  async remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
