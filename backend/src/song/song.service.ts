import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SongDto } from 'src/song/dto/song.dto'

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) { }

  async findAll(eventId: string) {
    return await this.prisma.song.findMany({
      select: {
        songId: true,
        songName: true,
        songKey: true,
      },
      where: { eventId }
    })
  }

  async findOne(songId: string, eventId: string) {
    const song = await this.prisma.song.findUnique({
      where: { songId, eventId }
    })

    return song ? {
      ...song,
      totalVocalist: String(song.totalVocalist),
      totalGuitarist: String(song.totalGuitarist),
      totalDrummer: String(song.totalDrummer),
      totalKeyboardist: String(song.totalKeyboardist),
      totalExtra: String(song.totalExtra),
      totalPercussionist: String(song.totalPercussionist),
      totalBassist: String(song.totalBassist),
    } : null
  }

  async findBySongName(songName: string, eventId: string) {
    return await this.prisma.song.findFirst({
      where: {
        songName,
        eventId
      }
    })
  }

  async findByEventId(eventId: string) {
    return this.prisma.song.findMany({
      where: { eventId }
    })
  }

  async create(createSongDto: SongDto, eventId: string) {
    const {
      totalBassist,
      totalDrummer,
      totalExtra,
      totalGuitarist,
      totalKeyboardist,
      totalPercussionist,
      totalVocalist,
    } = createSongDto

    const convertedData = {
      ...createSongDto,
      totalBassist: Number(totalBassist),
      totalDrummer: Number(totalDrummer),
      totalExtra: Number(totalExtra),
      totalGuitarist: Number(totalGuitarist),
      totalKeyboardist: Number(totalKeyboardist),
      totalPercussionist: Number(totalPercussionist),
      totalVocalist: Number(totalVocalist),
    }

    const lastSong = await this.prisma.song.findFirst({
      orderBy: {
        songOrder: 'desc'
      },
    })

    const nextSongOrder = lastSong ? lastSong.songOrder + 1 : 1

    const newSong = await this.prisma.song.create({
      data: {
        ...convertedData,
        songOrder: nextSongOrder,
        event: {
          connect: {
            eventId: eventId,
          }
        }
      }
    })

    return newSong
  }

  async update(songId: string, songdata: SongDto) {
    const {
      totalBassist,
      totalDrummer,
      totalExtra,
      totalGuitarist,
      totalKeyboardist,
      totalPercussionist,
      totalVocalist
    } = songdata

    const convertedData = {
      ...songdata,
      totalBassist: Number(totalBassist),
      totalDrummer: Number(totalDrummer),
      totalExtra: Number(totalExtra),
      totalGuitarist: Number(totalGuitarist),
      totalKeyboardist: Number(totalKeyboardist),
      totalPercussionist: Number(totalPercussionist),
      totalVocalist: Number(totalVocalist)
    }
    return await this.prisma.song.update({
      where: { songId },
      data: convertedData,
    })
  }

  async remove(songId: string, eventId: string) {
    return await this.prisma.song.delete({
      where: { songId, eventId }
    })
  }



}
