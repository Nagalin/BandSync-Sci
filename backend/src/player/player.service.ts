import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayerService {
    constructor(private prisma: PrismaService) { }

    async findAll(songId: string, playerType: 
        'guitarist' | 'bassist' | 'drummer' | 'vocalist'  | 'Keyboardist' | 'extra' | 'percussionist'
    ) {
        return await this.prisma.user.findMany({
            where: {
                songs: {
                    some: {
                        songId
                    }
                },

                roles: {
                    some: {
                        role: playerType
                    }
                }
            }
        })
    }

    async findAssignedPlayer(songId: string, playerType: 
        'guitarist' | 'bassist' | 'drummer' | 'vocalist'  | 'Keyboardist' | 'extra' | 'percussionist'
    ) {
        return await this.prisma.song.findMany({
            where: {
                
                        songId,
    
                
              
            },
            include: {
                users: true
            }

           
        })
    }

    async findUnassignedPlayer(songId: string, playerType: 
        'guitarist' | 'bassist' | 'drummer' | 'vocalist'  | 'Keyboardist' | 'extra' | 'percussionist'
    ) {
        return await this.prisma.user.findMany({
            where: {
                songs: {
                    none: {
                        songId
                    }
                },

                roles: {
                    every: {
                        role: playerType
                    }
                }
            },
            include: {
                songs: true
            }
        })
    }

    async assignPlayer(songId: string, playerIds: string[]) {
        const song = await this.prisma.song.findFirst({
            where: {
                songId
            }
        })
        for (const userId of playerIds) {
            // Get user with their roles
            const user = await this.prisma.user.findFirst({
                where: { userId },
                include: { roles: true }
            });

            // if (!user || !user.roles.length) continue;

            // Get the first role of the user
            const playerRole = user.roles[0].role.toLowerCase();

            // Update song with user connection and increment the appropriate counter
            await this.prisma.song.update({
                where: { songId },
                data: {
                    users: {
                        connect: { userId }
                    },
                    ...(playerRole === 'vocalist' && { currentVocalList: { increment: 1 } }),
                    ...(playerRole === 'guitarist' && { currentGuitarist: { increment: 1 } }),
                    ...(playerRole === 'drummer' && { currentDrummer: { increment: 1 } }),
                    ...(playerRole === 'bassist' && { currentBassist: { increment: 1 } }),
                    ...(playerRole === 'keyboardist' && { currentKeyboardist: { increment: 1 } }),
                    ...(playerRole === 'extra' && { currentExtra: { increment: 1 } }),
                    ...(playerRole === 'percussionist' && { currentPercussionist: { increment: 1 } })
                },
            });
        }
    }

    async unassignPlayer(songId: string, playerIds: string[]) {
       
        for (const userId of playerIds) {
          await this.prisma.song.update({
            where: { songId },
            data: {
              users: {
                disconnect: { userId }
              },
            },
          });
        }
    }

}
