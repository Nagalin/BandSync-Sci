import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { Auth, google, sheets_v4 } from 'googleapis';
import { PrismaService } from '../prisma.service';
import { UserRole } from '@prisma/client';

const unparsedKey = process.env.GOOGLE_APPLICATION_CREDENTIALS
const key = JSON.parse(unparsedKey || '{}');
@Injectable()
export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private auth: Auth.GoogleAuth;
  private spreadsheetId = process.env.GOOGLE_SHEET_ID
  private sheetRange = 'B2:G2'
  private discordServerId = process.env.DISCORD_SERVER_ID



  constructor(private readonly prisma: PrismaService, private readonly client: Client) {
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

  async checkIfUserAlreadyExist(discordUsername: string, userPartFromGoogleSheet: string) {
    
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
    const playerRole = roleMapping[userPartFromGoogleSheet] ? roleMapping[userPartFromGoogleSheet] : 'staff'
    const existingUserWithSameRole = await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            discordUsername: discordUsername,
            isActive: true,

          },

          {
            roles: {
              some: {
                role: playerRole
              }

            }
          }


        ]
      }
    })

    const existingUserWithDifferentRole = await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            discordUsername: discordUsername,
            isActive: true
          },
          {
            NOT: {
              roles: {
                some: {
                  role: playerRole
                }
              }
            }
          }
        ],



      },

      include: {
        roles: true
      }

    })
    return {
      existingUserWithSameRole,
      existingUserWithDifferentRole

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
    const response = await this.sheets.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!${cellRange}`,
    })

    const discordMemberMapper = await this.getDiscordMembersMapper()

    response.data.values.map(async currNewMember => {

      const discordId = discordMemberMapper[currNewMember[0]]
      const playerRole = roleMapping[currNewMember[1]] ? roleMapping[currNewMember[1]] : 'staff'
      console.log('fff: ', playerRole)
      this.addNewUserToDiscordChannel(discordId, currNewMember[1])

      const role = await this.prisma.role.findFirst({
        where: { role: playerRole }
      })

      const {
        existingUserWithSameRole,
        existingUserWithDifferentRole
      } = await this.checkIfUserAlreadyExist(currNewMember[0],currNewMember[1])

      console.log('first: ', existingUserWithSameRole)
      console.log('first: ', existingUserWithDifferentRole)


      if (!existingUserWithSameRole && !existingUserWithDifferentRole) {
        const firstname = currNewMember[5].split(' ')[0]
        const lastname = currNewMember[5].split(' ')[1]
        const nickname = currNewMember[4]

        await this.prisma.user.create({
          data: {
            discordId: discordId,
            discordUsername: currNewMember[0],
            firstName: firstname,
            lastName: lastname,
            nickName: nickname,
            isActive: true,
            roles: {
              connect: {
                roleId: role.roleId
              }
            }
          }
        })
        this.addNewUserToDiscordChannel(discordId,currNewMember[1])
      } else if (existingUserWithDifferentRole) {
        const newRoleInfo = await this.prisma.role.findFirst({
          where: {
            role: playerRole
          }
        })
        await this.prisma.user.update({
          where: {
            userId: existingUserWithDifferentRole.userId
          },

          data: {
            roles: {
              connect: {
                roleId: newRoleInfo.roleId

              }

            }

          }
        })
        this.addNewUserToDiscordChannel(discordId, currNewMember[1])

      } else {
        console.log('this is conflict')
      }

    })

  }

  async addNewUserToDiscordChannel(discordId: string, userRoleFromGoogleSheet: string) {
    const guild = this.client.guilds.cache.get(this.discordServerId);
    if (!guild) {
      throw new Error(`Discord server with ID ${this.discordServerId} not found`);
    }

    const member = await guild.members.fetch(discordId);
    if (!member) {
      throw new Error(`Member with ID ${discordId} not found in the server`);
    }

    
    const role = guild.roles.cache.find(r => r.name === userRoleFromGoogleSheet);

    if (!role) {
      throw new Error(`Discord role "${userRoleFromGoogleSheet}" not found in the server`);
    }

    try {
      await member.roles.add(role);
    } catch (error) {
      console.error(`Failed to assign role to member ${discordId}:`, error);
      throw new Error(`Failed to assign role "${userRoleFromGoogleSheet}" to member`);
    }
  }

  async getDiscordMembersMapper() {
    const guild = this.client.guilds.cache.get(this.discordServerId)
    const members = await guild.members.fetch()
    let discordMemberMapper: Record<string, string> = {
      
    }

    members.map(member => {
      discordMemberMapper[member.user.tag] = member.id;
    });
    return discordMemberMapper
  }

  async removeUserFromDiscordServer(userId: string[]) {
    for (const curr of userId) {
      const user = await this.prisma.user.findFirst({
        where: {
          userId: curr,
          isActive: true
        }
      });

      if (!user) {
        console.log(`User ${curr} not found or already inactive`);
        continue;
      }

      try {
        // Get the Discord guild
        const guild = this.client.guilds.cache.get(this.discordServerId);
        if (!guild) {
          throw new Error(`Discord server with ID ${this.discordServerId} not found`);
        }

        // Get the member from Discord
        const member = await guild.members.fetch(user.discordId);
        if (!member) {
          console.log(`Member with ID ${user.discordId} not found in the server`);
          continue;
        }

        // Kick the member from the server
        await member.kick('Removed by BandSync system');

        console.log(`Successfully removed user ${user.discordUsername} from the server`);
      } catch (error) {
        console.error(`Failed to remove user ${curr}:`, error);
      }
    }
  }
} 