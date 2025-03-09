// song.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { SongService } from './song.service';
import { Prisma } from '@prisma/client';
import { CreateSongDto } from './dto/create-song.dto';
import { ConflictException } from '@nestjs/common';

@Controller('events/:eventId/songs')
export class SongController {
  constructor(private readonly songService: SongService) { }

  // ดึงข้อมูลเพลงทั้งหมด
  @Get()
  async findAll(@Param('eventId') eventId: string) {
    try {
      // เรียกใช้ service เพื่อดึงข้อมูลที่เชื่อมโยงกับ eventId
      const songs = await this.songService.findAll(eventId);
      return songs;
    } catch (error) {
      // จัดการข้อผิดพลาดและส่งข้อความที่เหมาะสม
      console.error(error);
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม');
    }
  }

  // ดึงข้อมูลเพลงตาม id
  @Get(':songId')
  async findOne(@Param('songId') songId: string ,@Body() SongDto: CreateSongDto) {
    try {
      // เรียกใช้ service เพื่อดึงข้อมูลเพลงตาม id
      const event = await this.songService.findOne(SongDto,songId);

      // ถ้าไม่พบข้อมูลเพลง
      if (!event) {
        throw new HttpException(
          'ไม่พบข้อมูลเพลงที่มี id: ' + songId,
          HttpStatus.NOT_FOUND, // 404 Not Found
        );
      }

      // ถ้าพบข้อมูลเพลง
      return event;
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
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
  @Put(':songId')
    async update(@Param('songId') songId: string, @Body() songData: Prisma.SongUpdateInput) {
    try {
      // เรียกใช้ service เพื่ออัปเดตข้อมูลเพลงตาม id
      const updatedSong = await this.songService.update(songId,songData);
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error(error);
      // หากเป็นข้อผิดพลาดอื่นๆ เช่นการเชื่อมต่อฐานข้อมูล หรือข้อผิดพลาดในการประมวลผล
      throw new HttpException(
        'เกิดข้อผิดพลาดในการอัปเดตเพลง',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }

  // ลบเพลง
  @Delete(':songId')
  async remove(@Param('songId') songId: string) {
    try {
      // เรียกใช้ service เพื่อทำการลบข้อมูลเพลงตาม id
      await this.songService.remove(songId);
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error(error);
      // หากเป็นข้อผิดพลาดอื่นๆ เช่นการเชื่อมต่อฐานข้อมูล หรือข้อผิดพลาดในการประมวลผล
      throw new HttpException(
        'เกิดข้อผิดพลาดในการลบข้อมูลกิจกรรม',
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error
      );
    }
  }
}
