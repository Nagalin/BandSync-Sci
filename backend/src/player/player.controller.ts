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
import { BackstageGuard } from 'src/guard/backstage.guard'
import { PlayerDto, PlayerType } from 'src/player/dto/player.dto'
import {  ApiResponse } from '@nestjs/swagger'
import { GetAssignedPlayResponseDto, GetPlayerDto, GetUnassignedPlayResponseDto } from './dto/get-player.dto'

@Controller('songs/:songId/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @ApiResponse({
        status: 200,
        type: GetPlayerDto
    })
    @Get(':playerType')
    async findAll(
        @Param('songId') songId: string,
        @Param('playerType') playerType: PlayerType
    ) {
        return await this.playerService.findAll(songId, playerType)
    }


    @ApiResponse({
        status: 200,
        type: GetAssignedPlayResponseDto,
        description: 'get the assigned player in the song'
    })
    @Get('assigned/:playerType')
    async findAssignedPlayer(
        @Param('songId') songId: string,
        @Param('playerType') playerType: PlayerType
    ) {
        return await this.playerService.findAssignedPlayer(songId, playerType)
    }

    @ApiResponse({
        status: 200,
        type: GetUnassignedPlayResponseDto,
        description: 'get the unassigned player in the song'
    })
    @Get('unassigned/:playerType')
    async findUnassignedPlayer(
        @Param('songId') songId: string,
        @Param('playerType') playerType: PlayerType
    ) {
        return await this.playerService.findUnassignedPlayer(songId, playerType)
    }

    @ApiResponse({
        status: 201,
        description: 'assign the player to a song'
    })
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

    @ApiResponse({
        status: 201,
        description: 'unassign the player from a song'
    })
    @Post('/unassign')
    async unassignPlayer(@Body() playerDto: PlayerDto) {
        const { songId, playerId } = playerDto
        await this.playerService.unassignPlayer(songId, playerId)
    }
}
