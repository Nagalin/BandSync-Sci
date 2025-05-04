import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SongService } from 'src/song/song.service';
import { SongDto } from 'src/song/dto/song.dto';
import { BackstageGuard } from 'src/guard/auth.guard';
import { ConflictException, NotFoundException } from 'src/exception/custom-exception';
import { ReorderSongDto } from 'src/song/dto/song.dto'; // <-- เพิ่ม import DTO สำหรับ reorder

@Controller('events/:eventId/songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  async findAll(@Param('eventId') eventId: string) {
    const songs = await this.songService.findAll(eventId);
    return songs;
  }

  @Get(':songId')
  async findOne(@Param('eventId') eventId: string, @Param('songId') songId: string) {
    const event = await this.songService.findOne(songId, eventId);

    if (!event) throw new NotFoundException('Song not found');
    return event;
  }

  @Post()
  @UseGuards(BackstageGuard)
  async create(@Param('eventId') eventId: string, @Body() songData: SongDto) {
    const existingEvent = await this.songService.findBySongName(songData.songName, eventId);
    if (existingEvent) throw new ConflictException('ชื่อเพลงนี้มีอยู่แล้ว');

    return await this.songService.create(songData, eventId);
  }

  @Put(':songId')
  @UseGuards(BackstageGuard)
  async update(
    @Param('eventId') eventId: string,
    @Param('songId') songId: string,
    @Body() songData: SongDto,
  ) {
    await this.songService.update(songId, songData);
  }

  @Delete(':songId')
  @UseGuards(BackstageGuard)
  async remove(@Param('eventId') eventId: string, @Param('songId') songId: string) {
    await this.songService.remove(songId, eventId);
  }

  @Patch('reorder')
  @UseGuards(BackstageGuard) // ใช้ Guard เพื่อให้ reorder ได้เฉพาะ backstage
  async reorderSongs(
    @Param('eventId') eventId: string,
    @Body() reorderSongDto: ReorderSongDto,
  ) {
    return await this.songService.reorderSongs(reorderSongDto.songOrder, eventId);
  }

  @Post(':songId/notification')
  async notification(@Param('eventId') eventId: string, @Param('songId') songId: string) {
    await this.songService.notification(songId)
   
  }
}
