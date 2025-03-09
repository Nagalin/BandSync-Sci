import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) { }

  // ดึงข้อมูลเพลงทั้งหมด
  async findAll(eventId: string) {
    // ค้นหาข้อมูลทั้งหมดจากฐานข้อมูล
    return await this.prisma.song.findMany({
      select: {
        songId: true,
        songName: true,
        songKey: true,
      },
      where: {
        eventId
      }
    });
  }


  // ดึงข้อมูลเพลงตาม id
  async findOne(songId: string, eventId: string) {
    const song = await this.prisma.song.findUnique({
      where: { songId, eventId }
    })

    return song? {
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

  // ค้นหาเพลงตามชื่อเพลง
  async findBySongName(songName: string, eventId: string) {
    return this.prisma.song.findFirst({
      where: {
        songName,
        eventId
      },
    });
  }

  // ค้นหาเพลงทั้งหมดที่เชื่อมโยงกับ eventId
  async findByEventId(eventId: string) {
    return this.prisma.song.findMany({
      where: { eventId }, // ค้นหาเพลงที่เชื่อมโยงกับ eventId
    });
  }

  // สร้างเพลงใหม่และเชื่อมโยงกับ Event
  async create(createSongDto: CreateSongDto, eventId: string) {
    const {
      totalBassist,
      totalDrummer,
      totalExtra,
      totalGuitarist,
      totalKeyboardist,
      totalPercussionist,
      totalVocalist,
    } = createSongDto;

    // Convert the string fields to numbers
    const convertedData = {
      ...createSongDto,
      totalBassist: Number(totalBassist),
      totalDrummer: Number(totalDrummer),
      totalExtra: Number(totalExtra),
      totalGuitarist: Number(totalGuitarist),
      totalKeyboardist: Number(totalKeyboardist),
      totalPercussionist: Number(totalPercussionist),
      totalVocalist: Number(totalVocalist),
    };

    // ค้นหา songOrder ที่สูงที่สุดในระบบ
    const lastSong = await this.prisma.song.findFirst({
      orderBy: {
        songOrder: 'desc', // เรียงจาก songOrder ที่มากที่สุด
      },
    });

    const nextSongOrder = lastSong ? lastSong.songOrder + 1 : 1;

    // สร้างเพลงใหม่
    const newSong = await this.prisma.song.create({
      data: {
        ...convertedData,  // Use the converted data here
        songOrder: nextSongOrder,  // ตั้งค่า songOrder ใหม่
        event: {
          connect: {
            eventId: eventId,  // เชื่อมโยงเพลงกับ Event ด้วย eventId
          },
        },
      },
    });

    return newSong;
  }

  // อัพเดตเพลง
  async update(songId: string, songdata: CreateSongDto) {
    const {
      totalBassist,
      totalDrummer,
      totalExtra,
      totalGuitarist,
      totalKeyboardist,
      totalPercussionist,
      totalVocalist,
    } = songdata;

    const convertedData = {
      ...songdata,
      totalBassist: Number(totalBassist),
      totalDrummer: Number(totalDrummer),
      totalExtra: Number(totalExtra),
      totalGuitarist: Number(totalGuitarist),
      totalKeyboardist: Number(totalKeyboardist),
      totalPercussionist: Number(totalPercussionist),
      totalVocalist: Number(totalVocalist),
    };
    return await this.prisma.song.update({
      where: { songId },
      data: convertedData,
    });
  }

  // ลบเพลง
  async remove(songId: string, eventId: string) {
    return await this.prisma.song.delete({
      where: { songId, eventId },
    });
  }
}
