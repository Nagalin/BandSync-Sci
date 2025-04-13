import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { EventDto } from 'src/event/dto/event.dto'

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) { }

  async create(eventData: EventDto) {
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
        additionalDetails: additionalDetails ? additionalDetails : '-'
      }
    })
  }

  async findAll() {
    return await this.prisma.event.findMany({
      select: {
        eventId: true,
        eventName: true,
        eventDate: true,
        startTime: true,
        endTime: true
      }
    })
  }

  async findOne(eventId: string) {
    return await this.prisma.event.findUnique({
      where: { eventId }
    })
  }

  async findByEventName(eventName: string) {
    return await this.prisma.event.findUnique({
      where: { eventName }
    })
  }

  async update(eventId: string, eventData: EventDto) {
    await this.prisma.event.update({
      where: { eventId },
      data: eventData
    })
  }

  async delete(eventId: string) {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.song.deleteMany({
        where: { eventId }
      })

      await prisma.event.delete({
        where: { eventId }
      })
    })
  }
}
