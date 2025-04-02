import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
        const players = await this.playerService.findUnassignedPlayer(songId, playerType);
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
      async assignPlayer(@Body() body : { songId: string, playerId: string[] }) {
        const { songId, playerId } = body
        const songs = await this.playerService.assignPlayer(songId, playerId)
    //   songs.map((song) => console.log(song.users))
    
      }

    @Post('/unassign')
    async unassignPlayer(@Body() body : { songId: string, playerId: string[] }) {
        const { songId, playerId } = body
        const songs = await this.playerService.unassignPlayer(songId, playerId)
    }
    
}
