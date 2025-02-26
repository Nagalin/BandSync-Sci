import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';  
import { Prisma } from '@prisma/client';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.song.findMany();
  }

  async findOne(id: string) {
    return this.prisma.song.findUnique({
      where: { id }
    });
  }

  async findBySongName(songName: string) {
    return this.prisma.song.findUnique({
      where: { songName }
    });
  }

  async create(createSongDto: CreateSongDto) {
    // ค้นหา songOrder ที่สูงที่สุดในระบบ
    const lastSong = await this.prisma.song.findFirst({
      orderBy: {
        songOrder: 'desc',  // เรียงจาก songOrder ที่มากที่สุด
      },
    });
    const nextSongOrder = lastSong ? lastSong.songOrder + 1 : 1;

    // สร้างเพลงใหม่
    const newSong = await this.prisma.song.create({
      data: {
        ...createSongDto,  // ข้อมูลที่รับมาจาก DTO
        songOrder: nextSongOrder,  // ตั้งค่า songOrder ใหม่
      },
    });

    return newSong;
  }


  async update(id: string, data: Prisma.SongUpdateInput) {
    return this.prisma.song.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.song.delete({
      where: { id },
    });
  }
}
