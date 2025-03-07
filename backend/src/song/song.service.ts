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
  async findOne(songId: string) {
    return await this.prisma.song.findUnique({
      where: { songId },
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
      currentBassist,
      currentDrummer,
      currentExtra,
      currentGuitarist,
      currentKeyboardist,
      currentPercussionist,
      currentVocalist,
    } = createSongDto;
  
    // Convert the string fields to numbers
    const convertedData = {
      currentBassist: Number(currentBassist),
      currentDrummer: Number(currentDrummer),
      currentExtra: Number(currentExtra),
      currentGuitarist: Number(currentGuitarist),
      currentKeyboardist: Number(currentKeyboardist),
      currentPercussionist: Number(currentPercussionist),
      currentVocalist: Number(currentVocalist),
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
            eventId: eventId,  // เชื่อมโยงเพลงกับ Event ด้วย eventId
          },
        },
      },
    });
  
    return newSong;
  }

  // อัพเดตเพลง
  async update(songId: string, songdata: Prisma.SongUpdateInput) {
    return await this.prisma.song.update({
      where: { songId },
      data: songdata,
    });
  }

  // ลบเพลง
  async remove(songId: string) {
    return await this.prisma.song.delete({
      where: { songId },
    });
  }
}
