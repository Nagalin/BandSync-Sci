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
  Request,
} from '@nestjs/common'
import { SongService } from 'src/song/song.service'
import { GetSongDetailResponseDto, GetSongsListResponseDto } from 'src/song/dto/song.dto'
import { BackstageGuard } from 'src/guard/backstage.guard'
import { ConflictException, NotFoundException } from 'src/exception/custom-exception'
import { Request as ExpressRequest } from 'express'
import { DiscordService } from 'src/discord/discord.service'
import { ApiResponse } from '@nestjs/swagger'
import { CreateAndUpdateSongDto } from './dto/create-update-song.dto'
import { ReorderSongDto } from './dto/reorder-song.dto'

@Controller('events/:eventId/songs')
export class SongController {
  constructor(private readonly songService: SongService, private readonly discordService: DiscordService) { }

  @ApiResponse({
    status: 200,
    description: 'Get a song queue by eventId',
    isArray: true,
    type: GetSongsListResponseDto
  })
  @Get()
  async findAll(@Param('eventId') eventId: string, @Request() req: ExpressRequest) {
    const songs = await this.songService.findAll(eventId, req.user.userId)
    return songs
  }

  @ApiResponse({
    status: 200,
    description: 'Get a song detail by songId',
    type: GetSongDetailResponseDto
  })
  @Get(':songId')
  async findOne(@Param('eventId') eventId: string, @Param('songId') songId: string) {
    const song = await this.songService.findOne(songId, eventId)

    if (!song) throw new NotFoundException('Song not found')
    return song
  }

  @ApiResponse({
    status: 201,
    description: 'Create a new song successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'song name alerady exists',
  })
  @Post()
  @UseGuards(BackstageGuard)
  async create(@Param('eventId') eventId: string, @Body() songData: CreateAndUpdateSongDto) {
    const existingSong = await this.songService.findBySongName(songData.songName, eventId)
    if (existingSong) throw new ConflictException('ชื่อเพลงนี้มีอยู่แล้ว')

    return await this.songService.create(songData, eventId)
  }

  @ApiResponse({
    status: 200,
    description: 'Update song detail successfully',
  })
  @Put(':songId')
  @UseGuards(BackstageGuard)
  async update(
    @Param('songId') songId: string,
    @Body() songData: CreateAndUpdateSongDto,
  ) {
    await this.songService.update(songId, songData)
  }

  @ApiResponse({
    status: 200,
    description: 'Delete a song by songId successfully',
  })
  @Delete(':songId')
  @UseGuards(BackstageGuard)
  async remove(@Param('eventId') eventId: string, @Param('songId') songId: string) {
    await this.songService.remove(songId, eventId)
  }

  @ApiResponse({
    status: 200,
    description: 'Reorder two songs successfully',
  })
  @Patch('reorder')
  @UseGuards(BackstageGuard)
  async reorderSongs(
    @Param('eventId') eventId: string,
    @Body() reorderSongDto: ReorderSongDto,
  ) {
    return await this.songService.reorderSongs(reorderSongDto.songOrder, eventId)
  }

  @ApiResponse({
    status: 201,
    description: 'successfully send notification to discord dm via discord bot',
  })
  @Post(':songId/notification')
  async notification(@Param('songId') songId: string, @Body('notiMessage') notiMessage: string) {
    await this.discordService.notification(songId, notiMessage)
  }
}
