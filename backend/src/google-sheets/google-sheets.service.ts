import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { google } from 'googleapis';
import { PrismaService } from '../prisma.service';
import { UserRole } from '@prisma/client';

const unparsedKey = process.env.GOOGLE_APPLICATION_CREDENTIALS
const key = JSON.parse(unparsedKey || '{}');
@Injectable()
export class GoogleSheetsService {
  private sheets;
  private auth;

  constructor(private readonly prisma: PrismaService,private readonly client: Client) {
    this.sheets = google.sheets('v4');
    this.auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  }

  async getSheetNames(spreadsheetId: string) {
    try {
      const response = await this.sheets.spreadsheets.get({
        auth: this.auth,
        spreadsheetId,
      });
      
      return response.data.sheets.map(sheet => sheet.properties.title);
    } catch (error) {
      throw new Error(`Failed to get sheet names: ${error.message}`);
    }
  }

  async readSheet() {
    const discordServerId = process.env.DISCORD_SERVER_ID
    const range = 'A2:D10'
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const roleMapping: Record<string, UserRole> = {
        'นักร้อง': UserRole.vocalist,
        'กีตาร์': UserRole.guitarist
    }
    
      const sheetNames = await this.getSheetNames(spreadsheetId);
      if (sheetNames.length === 0) {
        throw new Error('No sheets found in the spreadsheet');
      }

      const sheetName = range.includes('!') ? range.split('!')[0] : sheetNames[0];
      const cellRange = range.includes('!') ? range.split('!')[1] : range;

      if (!sheetNames.includes(sheetName)) {
        throw new Error(`Sheet "${sheetName}" not found. Available sheets: ${sheetNames.join(', ')}`);
      }
      const guild = this.client.guilds.cache.get(discordServerId)
      await guild.members.fetch();

      let discordMember: Record<string,string> = {}

    guild.members.cache.forEach(member => {
      discordMember[member.user.tag] = member.id;
    });

      const response = await this.sheets.spreadsheets.values.get({
        auth: this.auth,
        spreadsheetId,
        range: `${sheetName}!${cellRange}`,
      });

      response.data.values.map(async currNewMember => {
        const discordId = discordMember[currNewMember[1]]
        const playerRole = roleMapping[currNewMember[2]]
        
        const role = await this.prisma.role.findFirst({
          where: { role: playerRole }
        }) 
        const existingUser = await this.prisma.user.findFirst({
            where: {
                discordUsername: currNewMember[1],
                isActive: true
            }
        })

        if(!existingUser) {

            await this.prisma.user.create({
                data: {
                    discordId,
                    discordUsername: currNewMember[1],
                    firstName: 'first name',
                    lastName: 'last name',
                    nickName: 'nick name',
                    isActive: true,
                    roles: {
                        connect: {
                            roleId: role.roleId
                        }
                    }
                }
            })
        } else {
        }

      })
  }
} 