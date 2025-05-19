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
    // Initialize the Google Sheets API
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
    // try {
    //   First get the sheet names
      const sheetNames = await this.getSheetNames(spreadsheetId);
      if (sheetNames.length === 0) {
        throw new Error('No sheets found in the spreadsheet');
      }

      // Use the first sheet if no sheet name is specified in the range
      const sheetName = range.includes('!') ? range.split('!')[0] : sheetNames[0];
      const cellRange = range.includes('!') ? range.split('!')[1] : range;

      // Validate sheet name
      if (!sheetNames.includes(sheetName)) {
        throw new Error(`Sheet "${sheetName}" not found. Available sheets: ${sheetNames.join(', ')}`);
      }
    // console.log('here')
      const guild = this.client.guilds.cache.get(discordServerId)
      await guild.members.fetch(); // populates guild.members.cache

      let discordMember: Record<string,string> = {}

    guild.members.cache.forEach(member => {
      console.log(`${member.user.tag} (${member.id})`);
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
        
        // First find or create the role
        const role = await this.prisma.role.findFirst({
          where: { role: playerRole }
        }) 
        const existingUser = await this.prisma.user.findFirst({
            where: {
                discordUsername: currNewMember[1]
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
            console.log('already exist')
        }

      })

     
      
    //   // Process each member and get their Discord ID
    //   const processedMembers = await Promise.all(response.data.values.map(async currMember => {
    //     const username = currMember[1];
    //     try {
    //       // Search for the user in all guilds the bot has access to
    //       const user = await this.client.users.fetch('V_Unknown_V');
    //       console.log(user)
    //       if (user) {
    //         return {
    //           ...currMember,
    //           discordId: user.id
    //         };
    //       }
    //     } catch (error) {
    //       console.log(`Could not find Discord user for username: ${username}`);
    //     }
    //     return {
    //       ...currMember,
    //       discordId: null
    //     };
    //   }));

    //   return processedMembers;
    // } catch (error) {
    //   throw new Error(`Failed to read Google Sheet: ${error.message}`);
    // }
  }
} 