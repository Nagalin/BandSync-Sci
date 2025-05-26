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
    await this.prisma.user.update({
    where: {
      userId: '827ac91b-6943-43e9-9c40-8098899573aa'
    },
    data: {
      roles: {
        connect: {
          roleId: '6541e448-c2aa-49a3-94c0-e8c16e057210'
        }
      }
    }
    })
    return await this.prisma.event.findMany({
      select: {
        eventId: true,
        eventName: true,
        eventDate: true,
        startTime: true,
        endTime: true,
        status: true
      }
    })
  }

  async findCurrentSong(eventId: string) {
    const event =  await this.prisma.event.findUnique({
      where: { eventId },
      select: {
        currentSongId: true,
        currentSong: true
      }
    })

    const nextSong = await this.prisma.song.findFirst({
      where: {
        songOrder: event.currentSong.songOrder + 1

      }
    })

    return nextSong ? {
      songId: event.currentSongId,
      songName: nextSong.songName
    } : {
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
    console.log('shoud updated')
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

    if (currentIndex === songs.length ) 
      return

    
    
    const nextIndex = currentIndex + 1
    console.log(nextIndex, songs.length )
    
    const nextSongId = songs[nextIndex].songId
    console.log('before')
    console.log("next index", nextIndex)
    console.log("length", songs.length)

    if(nextIndex === songs.length) return
    console.log('after')


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