import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { PrismaService } from '../prisma.service'
import { AdminGuard } from '../guards/admin.guard'
import { UserService } from 'src/users/user.service'
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service'
import { DiscordService } from 'src/discord/discord.service'

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, UserService, AdminGuard, GoogleSheetsService, DiscordService]
})

export class AdminModule { }