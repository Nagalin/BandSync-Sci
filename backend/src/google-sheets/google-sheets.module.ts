import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { GoogleSheetsController } from './google-sheets.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [GoogleSheetsService, PrismaService],
  controllers: [GoogleSheetsController],
  exports: [GoogleSheetsService],
})
export class GoogleSheetsModule {} 