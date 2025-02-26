import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SongService } from './song.service';
import { Prisma } from '@prisma/client';
import { CreateSongDto } from './dto/create-song.dto';
import { ConflictException } from '@nestjs/common';

@Controller('songs')
export class SongController {
    constructor(private readonly songService: SongService) {}  

  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findOne(id);
  }

  @Post()
  async create(@Body() songData: CreateSongDto) {  
    const existingSong = await this.songService.findBySongName(songData.songName);  
    if (existingSong) {
      throw new ConflictException('ชื่อเพลงนี้มีอยู่แล้ว');  
    }

    return this.songService.create(songData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() songData: Prisma.SongUpdateInput) {  
    return this.songService.update(id, songData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songService.remove(id);
  }
}

