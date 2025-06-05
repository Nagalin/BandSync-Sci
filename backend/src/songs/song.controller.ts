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
import { SongService } from 'src/songs/song.service'
import { BackstageGuard } from 'src/guards/backstage.guard'
import { NotFoundException } from 'src/exceptions/custom-exception'
import { Request as ExpressRequest } from 'express'
import { DiscordService } from 'src/discord/discord.service'
import { CreateAndUpdateSongRequestDto } from './dto/create-update-song.dto'
import { ReorderSongRequestDto } from './dto/reorder-song.dto'
import {
  SwaggerCreateSong,
  SwaggerDeleteSong,
  SwaggerFindAllSongs,
  SwaggerFindOneSong,
  SwaggerNotificationSong,
  SwaggerReorderSong,
  SwaggerUpdateSong
} from './swaggers/song-swagger'

@Controller('events/:eventId/songs')
export class SongController {
  constructor(private readonly songService: SongService, private readonly discordService: DiscordService) { }

  @Get()
  @SwaggerFindAllSongs()
  async findAll(@Param('eventId') eventId: string, @Request() req: ExpressRequest) {
    const songs = await this.songService.findAll(eventId, req.user.userId)
    return songs
  }

  @Get(':songId')
  @SwaggerFindOneSong()
  async findOne(@Param('eventId') eventId: string, @Param('songId') songId: string) {
    const song = await this.songService.findOne(songId, eventId)

    if (!song) throw new NotFoundException('Song not found')
    return song
  }

  @Post()
  @UseGuards(BackstageGuard)
  @SwaggerCreateSong()
  async create(@Param('eventId') eventId: string, @Body() songData: CreateAndUpdateSongRequestDto) {
    return await this.songService.create(songData, eventId)
  }

  @Put(':songId')
  @UseGuards(BackstageGuard)
  @SwaggerUpdateSong()
  async update(
    @Param('songId') songId: string,
    @Body() songData: CreateAndUpdateSongRequestDto,
  ) {
    await this.songService.update(songId, songData)
  }

  @Delete(':songId')
  @UseGuards(BackstageGuard)
  @SwaggerDeleteSong()
  async remove(@Param('eventId') eventId: string, @Param('songId') songId: string) {
    await this.songService.remove(songId, eventId)
  }

  @Patch('reorder')
  @UseGuards(BackstageGuard)
  @SwaggerReorderSong()
  async reorderSongs(
    @Param('eventId') eventId: string,
    @Body() reorderSongDto: ReorderSongRequestDto,
  ) {
    return await this.songService.reorderSongs(reorderSongDto.songOrder, eventId)
  }

  @Post(':songId/notification')
  @SwaggerNotificationSong()
  async notification(@Param('songId') songId: string, @Body('notiMessage') notiMessage: string) {
    await this.discordService.notification(songId, notiMessage)
  }
}