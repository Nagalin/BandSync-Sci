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
    const roleMapping: Record<string, UserRole> = {
      'นักร้อง': UserRole.vocalist,
      'กีตาร์': UserRole.guitarist,
      'กลอง': UserRole.drummer,
      'เบส': UserRole.bassist,
      'คีย์บอร์ด': UserRole.Keyboardist,
      'extra': UserRole.extra,
      'percussion': UserRole.percussionist,
      'ผู้จัดการ': UserRole.backstage
    }

    const { sheetName, cellRange } = await this.getSheetName()
    return await this.sheets.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!${cellRange}`,
    })

    // const discordMemberMapper = await this.discordService.getDiscordMembersMapper()
    // response.data.values.map(async currNewMember => {

    //   const discordId = discordMemberMapper[currNewMember[0]]
    //   const playerRole = roleMapping[currNewMember[1]] ? roleMapping[currNewMember[1]] : 'staff'
    //   this.discordService.addNewUserToDiscordChannel(discordId, currNewMember[1])

    //   const role = await this.prisma.role.findFirst({
    //     where: { role: playerRole }
    //   })

    //   const {
    //     existingUserWithSameRole,
    //     existingUserWithDifferentRole
    //   } = await this.userService.checkIfUserAlreadyExist(currNewMember[0], currNewMember[1])


    //   if (!existingUserWithSameRole && !existingUserWithDifferentRole) {
    //     const firstname = currNewMember[5].split(' ')[0]
    //     const lastname = currNewMember[5].split(' ')[1]
    //     const nickname = currNewMember[4]

    //     await this.prisma.user.create({
    //       data: {
    //         discordId: discordId,
    //         discordUsername: currNewMember[0],
    //         firstName: firstname,
    //         lastName: lastname,
    //         nickName: nickname,
    //         isActive: true,
    //         roles: {
    //           connect: {
    //             roleId: role.roleId
    //           }
    //         }
    //       }
    //     })
    //     this.discordService.addNewUserToDiscordChannel(discordId, currNewMember[1])
    //   } else if (existingUserWithDifferentRole) {
    //     const newRoleInfo = await this.prisma.role.findFirst({
    //       where: {
    //         role: playerRole
    //       }
    //     })
    //     await this.prisma.user.update({
    //       where: {
    //         userId: existingUserWithDifferentRole.userId
    //       },

    //       data: {
    //         roles: {
    //           connect: {
    //             roleId: newRoleInfo.roleId

    //           }

    //         }

    //       }
    //     })
    //     this.discordService.addNewUserToDiscordChannel(discordId, currNewMember[1])

    //   } else {
    //     console.log('this is conflict')
    //   }

    // })

  }




 
} 