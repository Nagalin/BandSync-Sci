import { Module } from '@nestjs/common';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DiscordController],
  providers: [DiscordService, PrismaService]
})
export class DiscordModule {}
