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

  constructor(private readonly prisma: PrismaService, private readonly client: Client) {
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
    const range = 'B2:G2'
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
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
    const members = await guild.members.fetch()
members.map(curr => {
})
    let discordMemberMapper: Record<string, string> = {
      
    }

    members.map(member => {
      discordMemberMapper[member.user.tag] = member.id;
    });

    const response = await this.sheets.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId,
      range: `${sheetName}!${cellRange}`,
    });


    response.data.values.map(async currNewMember => {
      const discordId = discordMemberMapper[currNewMember[0]]

      const playerRole = roleMapping[currNewMember[1]]
      console.log('here: ', playerRole)

      const role = await this.prisma.role.findFirst({
        where: { role: playerRole }
      })
      const existingUserWithRole = await this.prisma.user.findFirst({
        where: {
          AND: [
            {
              discordUsername: currNewMember[0],
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

      const existbutAddNewRole = await this.prisma.user.findFirst({
        where: {
          AND: [
            {
              discordUsername: currNewMember[0],
              isActive: true},
            {NOT: {roles: {
              some: {
                role: playerRole
              }
            }}}
          ],
          
            
            
        },
        
        include: {
          roles: true
        }

      })
console.log(existingUserWithRole)

console.log(existbutAddNewRole)

      if (!existingUserWithRole && !existbutAddNewRole) {
        const firstname = currNewMember[5].split(' ')[0]
        const lastname = currNewMember[5].split(' ')[1]
        const nickname = currNewMember[4]

        await this.prisma.user.create({
          data: {
            discordId,
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
      } else if(existbutAddNewRole) {
        const newRoleInfo = await this.prisma.role.findFirst({
          where: {
            role: playerRole
          }
        })
        await this.prisma.user.update({
          where: {
            userId: existbutAddNewRole.userId
          },

          data: {
            roles: {
              connect: {
                roleId: newRoleInfo.roleId
                
              }

            }

          }
        })
      } else {
        console.log('this is conflict')
      }

    })
  }

  async getAllDiscordMembers() {
    const discordServerId = process.env.DISCORD_SERVER_ID;
    const guild = this.client.guilds.cache.get(discordServerId);
    
    if (!guild) {
      throw new Error(`Discord server with ID ${discordServerId} not found`);
    }

    const members = await guild.members.fetch();
    return members.map(member => ({
      id: member.id,
      username: member.user.username,
      tag: member.user.tag,
      nickname: member.nickname,
      roles: member.roles.cache.map(role => ({
        id: role.id,
        name: role.name
      }))
    }));
  }
} 