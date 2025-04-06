import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('songs/:songId/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Get(':playerType')
    async findAll(
        @Param('songId') songId: string, @Param('playerType') playerType:  'guitarist' | 'bassist' | 'drummer' | 'vocalist'  | 'Keyboardist' | 'extra' | 'percussionist'
    ) {
        const players = await this.playerService.findAll(songId, playerType);
        return players
      
    }

    @Get('assigned/:playerType')
    async dd(
        @Param('songId') songId: string, @Param('playerType') playerType:  'guitarist' | 'bassist' | 'drummer' | 'vocalist'  | 'Keyboardist' | 'extra' | 'percussionist'
    ) {
        const players = await this.playerService.findAssignedPlayer(songId, playerType);
        return players
      
    }

    @Get('unassigned/:playerType')
    async d(
        @Param('songId') songId: string, @Param('playerType') playerType:  'guitarist' | 'bassist' | 'drummer' | 'vocalist'  | 'Keyboardist' | 'extra' | 'percussionist'
    ) {
        const players = await this.playerService.findUnassignedPlayer(songId, playerType);
        return players
      
    }

    @Post('/assign')
      // @UseGuards(AuthGuard)
      async assignPlayer(@Body() body : { songId: string, playerId: string[], playerType: 'guitarist' | 'bassist' | 'drummer' | 'vocalist'  | 'Keyboardist' | 'extra' | 'percussionist' }) {
        const { songId, playerId, playerType } = body

        const cantAddMorePlayers = await this.playerService.canAddMorePlayers(songId, playerType)
        if (!cantAddMorePlayers) {
            throw new HttpException('Cannot add more players', HttpStatus.BAD_REQUEST);
        }
        const songs = await this.playerService.assignPlayer(songId, playerId, playerType)
    //   songs.map((song) => console.log(song.users))
    
      }

    @Post('/unassign')
    async unassignPlayer(@Body() body : { songId: string, playerId: string[] }) {
        const { songId, playerId } = body
        const songs = await this.playerService.unassignPlayer(songId, playerId)
    }
    
}
