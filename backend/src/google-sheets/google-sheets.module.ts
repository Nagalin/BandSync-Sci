import { Module } from '@nestjs/common'
import { GoogleSheetsService } from './google-sheets.service'
import { PrismaService } from 'src/prisma.service'
import { DiscordService } from 'src/discord/discord.service'
import { UserService } from 'src/users/user.service'

@Module({
  providers: [GoogleSheetsService, PrismaService, DiscordService, UserService],
  controllers: [],
  exports: [GoogleSheetsService],
})
export class GoogleSheetsModule {} 