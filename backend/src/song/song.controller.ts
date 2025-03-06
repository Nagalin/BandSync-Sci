// song.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, InternalServerErrorException } from '@nestjs/common';
import { SongService } from './song.service';
import { Prisma } from '@prisma/client';
import { CreateSongDto } from './dto/create-song.dto';
import { ConflictException } from '@nestjs/common';

@Controller('events/:eventId/songs')
export class SongController {
  constructor(private readonly songService: SongService) { }

  // ดึงข้อมูลเพลงทั้งหมด
  @Get()
  async findAll(@Param('id') eventId: string) {
    // ดึงเพลงทั้งหมดที่เกี่ยวข้องกับ eventId
    return this.songService.findByEventId(eventId);
  }

  // ดึงข้อมูลเพลงตาม id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findOne(id);
  }

  // สร้างเพลงใหม่
  @Post()
  async create(@Param('eventId') eventId: string, @Body() songData: CreateSongDto) {
    try {
      const existingEvent = await this.songService.findBySongName(songData.songName, eventId);
      if (existingEvent) {
        throw new ConflictException('ชื่อเพลงนี้มีอยู่แล้ว');
      }

      return await this.songService.create(songData, eventId);
    } catch (error) {
      console.error(error);

      // ตรวจสอบว่า error เป็น instance ของ ConflictException หรือไม่
      if (error instanceof ConflictException) {
        throw error;
      }

      // จัดการข้อผิดพลาดอื่น ๆ
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการสร้าง Event');
    }
  }

// อัพเดตเพลง
@Put(':id')
update(@Param('id') id: string, @Body() songData: Prisma.SongUpdateInput) {
  return this.songService.update(id, songData);
}

// ลบเพลง
@Delete(':id')
remove(@Param('id') id: string) {
  return this.songService.remove(id);
}
}
