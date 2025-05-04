import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PlayerType } from './dto/player.dto'

@Injectable()
export class PlayerService {
    constructor(private prisma: PrismaService) { }

   

    async findAll(songId: string, playerType: PlayerType) {
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

    async findAssignedPlayer(songId: string, playerType: PlayerType) {
        const song = await this.prisma.song.findFirst({
            where: {
                songId
            }
        })

        const players = await this.prisma.user.findMany({
            where: {
                songs: {
                    some: {
                        songId
                    }
                },
                roles: {
                    every: {
                        role: playerType
                    }
                }
            }
        })

        let totalPlayer: number, currentPlayer: number
        
        switch(playerType) {
            case PlayerType.VOCALIST:
                totalPlayer = song.totalVocalist
                currentPlayer = song.currentVocalList
                break
            case PlayerType.GUITARIST:
                totalPlayer = song.totalGuitarist
                currentPlayer = song.currentGuitarist
                break
            case PlayerType.DRUMMER:
                totalPlayer = song.totalDrummer
                currentPlayer = song.currentDrummer
                break
            case PlayerType.BASSIST:
                totalPlayer = song.totalBassist
                currentPlayer = song.currentBassist
                break
            case PlayerType.KEYBOARDIST:
                totalPlayer = song.totalKeyboardist
                currentPlayer = song.currentKeyboardist
                break
            case PlayerType.EXTRA:
                totalPlayer = song.totalExtra
                currentPlayer = song.currentExtra
                break
            case PlayerType.PERCUSSIONIST:
                totalPlayer = song.totalPercussionist
                currentPlayer = song.currentPercussionist
                break
        }

        return {
            totalPlayer,
            currentPlayer,
            players
        }
    }

    async findUnassignedPlayer(songId: string, playerType: PlayerType) {
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

    async assignPlayer(songId: string, playerIds: string[], playerType: PlayerType) {
        const song = await this.prisma.song.findUnique({
            where: { songId }
        })

        if (!song) return

        for (const userId of playerIds) {
            const user = await this.prisma.user.findFirst({
                where: { userId },
                include: { roles: true }
            })

            if (!user || !user.roles.length) continue

            const playerRole = user.roles[0].role

            await this.prisma.song.update({
                where: { songId },
                data: {
                    users: {
                        connect: { userId }
                    },
                    ...(playerRole === PlayerType.VOCALIST && { currentVocalList: { increment: 1 } }),
                    ...(playerRole === PlayerType.GUITARIST && { currentGuitarist: { increment: 1 } }),
                    ...(playerRole === PlayerType.DRUMMER && { currentDrummer: { increment: 1 } }),
                    ...(playerRole === PlayerType.BASSIST && { currentBassist: { increment: 1 } }),
                    ...(playerRole === PlayerType.KEYBOARDIST && { currentKeyboardist: { increment: 1 } }),
                    ...(playerRole === PlayerType.EXTRA && { currentExtra: { increment: 1 } }),
                    ...(playerRole === PlayerType.PERCUSSIONIST && { currentPercussionist: { increment: 1 } })
                },
            })
        }
    }

    async canAddMorePlayers(songId: string, type: PlayerType) {
        const song = await this.prisma.song.findUnique({
            where: { songId }
        })
        
        switch(type) {
            case PlayerType.VOCALIST: return song.currentVocalList < song.totalVocalist
            case PlayerType.GUITARIST: return song.currentGuitarist < song.totalGuitarist
            case PlayerType.DRUMMER: return song.currentDrummer < song.totalDrummer
            case PlayerType.BASSIST: return song.currentBassist < song.totalBassist
            case PlayerType.KEYBOARDIST: return song.currentKeyboardist < song.totalKeyboardist
            case PlayerType.EXTRA: return song.currentExtra < song.totalExtra
            case PlayerType.PERCUSSIONIST: return song.currentPercussionist < song.totalPercussionist
            default: return false
        }
    }

    async unassignPlayer(songId: string, playerIds: string[]) {
        for (const userId of playerIds) {
            const user = await this.prisma.user.findFirst({
                where: { userId },
                include: { roles: true }
            })

            if (!user || !user.roles.length) continue

            const playerRole = user.roles[0].role

            await this.prisma.song.update({
                where: { songId },
                data: {
                    users: {
                        disconnect: { userId }
                    },
                    ...(playerRole === PlayerType.VOCALIST && { currentVocalList: { decrement: 1 } }),
                    ...(playerRole === PlayerType.GUITARIST && { currentGuitarist: { decrement: 1 } }),
                    ...(playerRole === PlayerType.DRUMMER && { currentDrummer: { decrement: 1 } }),
                    ...(playerRole === PlayerType.BASSIST && { currentBassist: { decrement: 1 } }),
                    ...(playerRole === PlayerType.KEYBOARDIST && { currentKeyboardist: { decrement: 1 } }),
                    ...(playerRole === PlayerType.EXTRA && { currentExtra: { decrement: 1 } }),
                    ...(playerRole === PlayerType.PERCUSSIONIST && { currentPercussionist: { decrement: 1 } })
                },
            })
        }
    }
}
