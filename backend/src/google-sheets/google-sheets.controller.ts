import { Controller, Get, Query } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  @Get('read')
  async readSheet(
    @Query('spreadsheetId') spreadsheetId: string,
    @Query('range') range: string,
  ) {
    return this.googleSheetsService.readSheet()
  }
} 