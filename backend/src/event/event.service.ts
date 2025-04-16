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

  async findCurrentSong(eventId: string) {
    const event =  await this.prisma.event.findUnique({
      where: { eventId },
      select: {
        currentSongId: true
      }
    })

    return {
      songId: event.currentSongId
    }
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

  async updateCurrentSong(eventId: string) {
    const songs = await this.prisma.song.findMany({
      where: { eventId },
      orderBy: { songOrder: 'asc' }
    })

    const event = await this.prisma.event.findUnique({
      where: { eventId },
      select: {
        currentSongId: true
      }
    })

    if (songs.length === 0) {
      return
    }

    const currentIndex = songs.findIndex(song => song.songId === event.currentSongId)

    if (currentIndex === songs.length - 1) 
      return
    
    
    const nextIndex = currentIndex + 1
    
    const nextSongId = songs[nextIndex].songId

    await this.prisma.event.update({
      where: { eventId },
      data: {
        currentSongId: nextSongId
      }
    })
    
    return { nextSongId }
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

  async start(eventId: string) {
    const firstSong = await this.prisma.song.findFirst({
      where: { eventId },
      orderBy: { songOrder: 'asc' }
    })

    await this.prisma.event.update({
      where: { eventId },
      data: { status: 'ONGOING', currentSongId: firstSong?.songId }
    })
  }
}