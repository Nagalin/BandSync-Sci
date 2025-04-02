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
        return await this.prisma.user.findMany({
            where: {
                songs: {
                    every: {
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
                    some: {
                        role: playerType
                    }
                }
            }
        })
    }

    async assignPlayer(songId: string, playerIds: string[]) {
        // return await this.prisma.song.findMany({
        //     include: {
        //         users: true,
        //     },

        // })
        for (const userId of playerIds) {
          await this.prisma.song.update({
            where: { songId },
            data: {
              users: {
                connect: { userId }
              },
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
