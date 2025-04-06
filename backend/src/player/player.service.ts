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

    async assignPlayer(songId: string, playerIds: string[], playerType: 'guitarist' | 'bassist' | 'drummer' | 'vocalist'  | 'Keyboardist' | 'extra' | 'percussionist') {
        // Get the current song data to check player limits
        const song = await this.prisma.song.findUnique({
            where: { songId }
        });

        if (!song) return;

       

        for (const userId of playerIds) {
            // Get user with their roles
            const user = await this.prisma.user.findFirst({
                where: { userId },
                include: { roles: true }
            });

            if (!user || !user.roles.length) continue;

            // Get the first role of the user
            const playerRole = user.roles[0].role

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
                    ...(playerRole === 'Keyboardist' && { currentKeyboardist: { increment: 1 } }),
                    ...(playerRole === 'extra' && { currentExtra: { increment: 1 } }),
                    ...(playerRole === 'percussionist' && { currentPercussionist: { increment: 1 } })
                },
            });
        }
    }

     async canAddMorePlayers (songId: string, type: string) {
        const song = await this.prisma.song.findUnique({
            where: { songId }
        });
        const lowerType = type
        switch(lowerType) {
            case 'vocalist': return song.currentVocalList < song.totalVocalist;
            case 'guitarist': return song.currentGuitarist < song.totalGuitarist;
            case 'drummer': return song.currentDrummer < song.totalDrummer;
            case 'bassist': return song.currentBassist < song.totalBassist;
            case 'keyboardist': return song.currentKeyboardist < song.totalKeyboardist;
            case 'extra': return song.currentExtra < song.totalExtra;
            case 'percussionist': return song.currentPercussionist < song.totalPercussionist;
            default: return false;
        }
    };

   

    async unassignPlayer(songId: string, playerIds: string[]) {
       
        for (const userId of playerIds) {
          // Get user with their roles to determine what counter to decrement
          const user = await this.prisma.user.findFirst({
            where: { userId },
            include: { roles: true }
          });

          if (!user || !user.roles.length) continue;

          // Get the first role of the user
          const playerRole = user.roles[0].role;

          // Update song by disconnecting user and decrementing the appropriate counter
          await this.prisma.song.update({
            where: { songId },
            data: {
              users: {
                disconnect: { userId }
              },
              ...(playerRole === 'vocalist' && { currentVocalList: { decrement: 1 } }),
              ...(playerRole === 'guitarist' && { currentGuitarist: { decrement: 1 } }),
              ...(playerRole === 'drummer' && { currentDrummer: { decrement: 1 } }),
              ...(playerRole === 'bassist' && { currentBassist: { decrement: 1 } }),
              ...(playerRole === 'Keyboardist' && { currentKeyboardist: { decrement: 1 } }),
              ...(playerRole === 'extra' && { currentExtra: { decrement: 1 } }),
              ...(playerRole === 'percussionist' && { currentPercussionist: { decrement: 1 } })
            },
          });
        }
    }

}
