import { Module } from '@nestjs/common'
import { SongController } from './song.controller'
import { SongService } from './song.service'
import { PrismaService } from '../prisma.service'
import { DiscordService } from 'src/discord/discord.service'

@Module({
  controllers: [SongController],
  providers: [SongService,PrismaService, DiscordService]
})

export class SongModule {}
