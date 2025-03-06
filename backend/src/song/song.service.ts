import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) { }

  // ดึงข้อมูลเพลงทั้งหมด
  async findAll() {
    return this.prisma.song.findMany();
  }

  // ดึงข้อมูลเพลงตาม id
  async findOne(id: string) {
    return this.prisma.song.findUnique({
      where: { id },
    });
  }

  // ค้นหาเพลงตามชื่อเพลง
  async findBySongName(songName: string ,eventId: string) {
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
      songKey,
      songDescription,
      songName,
      songReference,
      songBassist,
      songDrummer,
      songExtra,
      songGuitarist,
      songKeyboardist,
      songPercussionist,
      songVocalist,
    } = createSongDto;
  
    // Convert the string fields to numbers
    const convertedData = {
      songBassist: Number(songBassist),
      songDrummer: Number(songDrummer),
      songExtra: Number(songExtra),
      songGuitarist: Number(songGuitarist),
      songKeyboardist: Number(songKeyboardist),
      songPercussionist: Number(songPercussionist),
      songVocalist: Number(songVocalist),
      songKey,
      songDescription,
      songReference,
      songName,
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
            id: eventId,  // เชื่อมโยงเพลงกับ Event ด้วย eventId
          },
        },
      },
    });
  
    return newSong;
  }

  // อัพเดตเพลง
  async update(id: string, data: Prisma.SongUpdateInput) {
    return this.prisma.song.update({
      where: { id },
      data,
    });
  }

  // ลบเพลง
  async remove(id: string) {
    return this.prisma.song.delete({
      where: { id },
    });
  }
}
