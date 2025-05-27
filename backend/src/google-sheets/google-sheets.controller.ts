import { Controller, Get, Post, Query } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  @Post('read')
  async readSheet(
  ) {
    return this.googleSheetsService.readSheet()
  }
} 