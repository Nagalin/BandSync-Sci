import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards
} from '@nestjs/common'
import { PlayerService } from 'src/players/player.service'
import { BackstageGuard } from 'src/guards/backstage.guard'
import { PlayerDto, PlayerType } from 'src/players/dto/player.dto'
import {
    SwaggerAssignPlayerToSong,
    SwaggerFindAllAssignedPlayersInSong,
    SwaggerFindAllUnAssignedPlayersInSong,
    SwaggerUnassignPlayerToSong
} from './swaggers/player-swagger'

@Controller('songs/:songId/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @Get('assigned/:playerType')
    @SwaggerFindAllAssignedPlayersInSong()
    async findAssignedPlayer(
        @Param('songId') songId: string,
        @Param('playerType') playerType: PlayerType
    ) {
        return await this.playerService.findAssignedPlayer(songId, playerType)
    }

    @Get('unassigned/:playerType')
    @SwaggerFindAllUnAssignedPlayersInSong()
    async findUnassignedPlayer(
        @Param('songId') songId: string,
        @Param('playerType') playerType: PlayerType
    ) {
        return await this.playerService.findUnassignedPlayer(songId, playerType)
    }

    @Post('/assign')
    @UseGuards(BackstageGuard)
    @SwaggerAssignPlayerToSong()
    async assignPlayer(@Body() playerDto: PlayerDto) {
        const { songId, playerId, playerType } = playerDto

        const canAddMorePlayers = await this.playerService.canAddMorePlayers(songId, playerType)
        if (!canAddMorePlayers) {
            throw new HttpException('Cannot add more players', HttpStatus.BAD_REQUEST)
        }
        await this.playerService.assignPlayer(songId, playerId, playerType)
    }

    @Post('/unassign')
    @UseGuards(BackstageGuard)
    @SwaggerUnassignPlayerToSong()
    async unassignPlayer(@Body() playerDto: PlayerDto) {
        const { songId, playerId } = playerDto
        await this.playerService.unassignPlayer(songId, playerId)
    }
}
