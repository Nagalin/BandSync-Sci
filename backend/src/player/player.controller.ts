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
import { PlayerService } from 'src/player/player.service'
import { BackstageGuard } from 'src/guard/auth.guard'
import { PlayerDto, PlayerType } from 'src/player/dto/player.dto'

@Controller('songs/:songId/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @Get(':playerType')
    async findAll(
        @Param('songId') songId: string,
        @Param('playerType') playerType: PlayerType
    ) {
        return await this.playerService.findAll(songId, playerType)
    }

    @Get('assigned/:playerType')
    async findAssignedPlayer(
        @Param('songId') songId: string,
        @Param('playerType') playerType: PlayerType
    ) {
        return await this.playerService.findAssignedPlayer(songId, playerType)
    }

    @Get('unassigned/:playerType')
    async findUnassignedPlayer(
        @Param('songId') songId: string,
        @Param('playerType') playerType: PlayerType
    ) {
        return await this.playerService.findUnassignedPlayer(songId, playerType)
    }

    @Post('/assign')
    @UseGuards(BackstageGuard)
    async assignPlayer(@Body() playerDto: PlayerDto) {
        const { songId, playerId, playerType } = playerDto

        const canAddMorePlayers = await this.playerService.canAddMorePlayers(songId, playerType)
        if (!canAddMorePlayers) {
            throw new HttpException('Cannot add more players', HttpStatus.BAD_REQUEST)
        }
        await this.playerService.assignPlayer(songId, playerId, playerType)
    }

    @Post('/unassign')
    async unassignPlayer(@Body() playerDto: PlayerDto) {
        const { songId, playerId } = playerDto
        const songs = await this.playerService.unassignPlayer(songId, playerId)
    }
}
