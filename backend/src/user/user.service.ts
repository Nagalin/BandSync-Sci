import { Injectable } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { DiscordService } from 'src/discord/discord.service'
import { PrismaService } from 'src/prisma.service'

type NewUserType = {
  discordId: string,
  discordUsername: string
  firstname: string,
  lastname: string,
  nickname: string,
  userRoleInGoogleSheet: string
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private discordService: DiscordService) { }

  
  async activateUser(newUser: NewUserType) {
    const {
      discordId,
      discordUsername,
      firstname,
      lastname,
      nickname,
      userRoleInGoogleSheet
    } = newUser
    
    const roleMapping: Record<string, UserRole> = {
      'นักร้อง': UserRole.vocalist,
      'กีตาร์': UserRole.guitarist,
      'กลอง': UserRole.drummer,
      'เบส': UserRole.bassist,
      'คีย์บอร์ด': UserRole.Keyboardist,
      'extra': UserRole.extra,
      'percussion': UserRole.percussionist,
      'backstage': UserRole.backstage
    }
    const playerRole = roleMapping[userRoleInGoogleSheet] ?? 'staff'
    const role = await this.prisma.role.findFirst({
      where: { role: playerRole }
    })

    const {
      existingUserWithSameRole,
      existingUserWithDifferentRole
    } = await this.checkIfUserAlreadyExist(discordUsername, userRoleInGoogleSheet)

    if (!existingUserWithSameRole && !existingUserWithDifferentRole) {
      await this.prisma.user.create({
        data: {
          discordId: discordId,
          discordUsername: discordUsername,
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
      this.discordService.addNewUserToDiscordChannel(discordId, userRoleInGoogleSheet)
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
      this.discordService.addNewUserToDiscordChannel(discordId, userRoleInGoogleSheet)

    } else {
      console.log('this is conflict')
    }
  }


  async deactivateUsers(userId: string[]) {
    await this.discordService.removeUserFromDiscordServer(userId)
    return await this.prisma.user.updateMany({
      where: {
        isActive: true,
        userId: {
          in: userId
        },
      },

      data: {
        isActive: false
      }
    })

  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: {
        isActive: true,
      },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
      }
    })

    return users.map(user => ({
      userId: user.userId,
      fullName: `${user.firstName} ${user.lastName}`,
    }))
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
      'backstage': UserRole.backstage
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

}
