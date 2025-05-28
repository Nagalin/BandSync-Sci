import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { Auth, google, sheets_v4 } from 'googleapis';
import { PrismaService } from '../prisma.service';
import { UserRole } from '@prisma/client';
import { DiscordService } from 'src/discord/discord.service';
import { UserService } from '../user/user.service';

const unparsedKey = process.env.GOOGLE_APPLICATION_CREDENTIALS
const key = JSON.parse(unparsedKey || '{}');
@Injectable()
export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private auth: Auth.GoogleAuth;
  private spreadsheetId = process.env.GOOGLE_SHEET_ID
  private sheetRange = 'B2:G2'
  private discordServerId = process.env.DISCORD_SERVER_ID



  constructor(private readonly userService: UserService, private readonly prisma: PrismaService, private readonly client: Client, private readonly discordService: DiscordService) {
    this.sheets = google.sheets('v4');
    this.auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  }

  async getSheetName() {
    try {
      const response = await this.sheets.spreadsheets.get({
        auth: this.auth,
        spreadsheetId: this.spreadsheetId,
      });

      const sheetNames = response.data.sheets.map(sheet => sheet.properties.title);
      if (sheetNames.length === 0) {
        throw new Error('No sheets found in the spreadsheet');
      }

      const sheetName = this.sheetRange.includes('!') ? this.sheetRange.split('!')[0] : sheetNames[0];
      const cellRange = this.sheetRange.includes('!') ? this.sheetRange.split('!')[1] : this.sheetRange;

      if (!sheetNames.includes(sheetName)) {
        throw new Error(`Sheet "${sheetName}" not found. Available sheets: ${sheetNames.join(', ')}`);
      }

      return {
        sheetName, cellRange
      }
    } catch (error) {
      throw new Error(`Failed to get sheet names: ${error.message}`);
    }

  }

  

  async readSheet() {
    const { sheetName, cellRange } = await this.getSheetName()
    return await this.sheets.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!${cellRange}`,
    })
  }
} 