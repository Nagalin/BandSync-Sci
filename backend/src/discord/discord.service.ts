import { Injectable } from '@nestjs/common'
import { Client } from 'discord.js'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class DiscordService {
  private discordServerId = process.env.DISCORD_SERVER_ID

    constructor(private readonly client: Client, private readonly prisma: PrismaService) { }

    async getDiscordMembersMapper() {
        const guild = this.client.guilds.cache.get(this.discordServerId)
        const members = await guild.members.fetch()
        let discordMemberMapper: Record<string, string> = {
          
        }
    
        members.map(member => {
          discordMemberMapper[member.user.tag] = member.id
        })
        return discordMemberMapper
      }

    async addNewUserToDiscordChannel(discordId: string, userRoleFromGoogleSheet: string) {
        const guild = this.client.guilds.cache.get(this.discordServerId)
        if (!guild) {
          throw new Error(`Discord server with ID ${this.discordServerId} not found`)
        }
    
        const member = await guild.members.fetch(discordId)
        if (!member) {
          throw new Error(`Member with ID ${discordId} not found in the server`)
        }
    
        
        const role = guild.roles.cache.find(r => r.name === userRoleFromGoogleSheet)
    
        if (!role) {
          throw new Error(`Discord role "${userRoleFromGoogleSheet}" not found in the server`)
        }
    
        try {
          await member.roles.add(role)
        } catch (error) {
          console.error(`Failed to assign role to member ${discordId}:`, error)
          throw new Error(`Failed to assign role "${userRoleFromGoogleSheet}" to member`)
        }
      }

      async removeUserFromDiscordServer(userId: string[]) {
        for (const curr of userId) {
          const user = await this.prisma.user.findFirst({
            where: {
              userId: curr,
              isActive: true
            }
          })
    
          if (!user) {
            console.log(`User ${curr} not found or already inactive`)
            continue
          }
    
          try {
            // Get the Discord guild
            const guild = this.client.guilds.cache.get(this.discordServerId)
            if (!guild) {
              throw new Error(`Discord server with ID ${this.discordServerId} not found`)
            }
    
            // Get the member from Discord
            const member = await guild.members.fetch(user.discordId)
            if (!member) {
              console.log(`Member with ID ${user.discordId} not found in the server`)
              continue
            }
    
            // Kick the member from the server
            await member.kick('Removed by BandSync system')
    
            console.log(`Successfully removed user ${user.discordUsername} from the server`)
          } catch (error) {
            console.error(`Failed to remove user ${curr}:`, error)
          }
        }
      }
}
