import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SongDto } from 'src/song/dto/song.dto'
import { Client } from 'discord.js';
import { Context, On, Once, ContextOf } from 'necord';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService,private readonly client: Client) { }

  private readonly logger = new Logger();

  @Once('ready')
  public onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }

  async findAll(eventId: string, userId: string) {
    return await this.prisma.song.findMany({
      select: {
        songId: true,
        songName: true,
        songKey: true,
        songOrder: true,
        users: {
          where: {
            userId: userId
          },
          select: {
            userId: true
          }
        }
      },
      orderBy: {
        songOrder: 'asc'
      },
      where: { eventId }
    }).then(songs => songs.map(song => ({
      ...song,
      isAssigned: song.users.length > 0,
      users: undefined
    })))
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

  async reorderSongs(songOrder: { songId: string; songOrder: number }[], eventId: string) {
    const updatePromises = songOrder.map((song) =>
      this.prisma.song.update({
        where: {
          songId: song.songId,
          eventId: eventId
        },
        data: {
          songOrder: song.songOrder,
        },
      })
    );
  
    await Promise.all(updatePromises);
  
    return { success: true };
  }

  async notification(songId: string, notiMessage: string) {
    const players = await this.prisma.user.findMany({
      where: {
        isActive: true,
        songs: {
          some: {
            songId: songId
          }
        }
      }
    })

    const currentSong = await this.prisma.song.findFirst({
      where: {
        songId: songId
      }
    })
    const nextSong = await this.prisma.song.findFirst({
      where: {
        songOrder: currentSong.songOrder + 1
      }
    })

    players.map(async curr => {
      const user = await this.client.users.fetch(curr.discordId)
      await user.send(notiMessage ?? `🎶 สวัสดี! เพลงถัดไปเป็นคิวแสดงของคุณ

🕒 เพลง: ${nextSong.songName}

กรุณาเตรียมตัวให้พร้อมและขึ้นเวทีตรงเวลา!

หากคุณมีคำถามเพิ่มเติมกรุณาติดต่อผู้ดูแลวงดนตรี 🙏`)
    })
  }

}
