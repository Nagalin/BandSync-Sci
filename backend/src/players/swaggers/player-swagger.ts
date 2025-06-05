import { applyDecorators } from "@nestjs/common"
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger"
import { GetAssignedPlayResponseDto, GetUnassignedPlayResponseDto } from "../dto/get-player.dto"
import { ForbiddenBackstageResponse, UnauthorizedResponse } from "src/decorators/api-responses.decorator"

export const SwaggerFindAllAssignedPlayersInSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get assigned players of a specific type for a song' }),
        ApiOkResponse({
            type: GetAssignedPlayResponseDto,
            description: 'get the assigned player in the song'
        }),
        UnauthorizedResponse()
    )
}

export const SwaggerFindAllUnAssignedPlayersInSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get unassigned players of a specific type for a song' }),
        ApiOkResponse({
            type: GetUnassignedPlayResponseDto,
            description: 'get the unassigned player in the song'
        }),
        UnauthorizedResponse()
    )
}

export const SwaggerAssignPlayerToSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Assign a player to a song' }),
        ApiCreatedResponse({
            description: 'assign the player to a song'
        }),
        ForbiddenBackstageResponse(),
        UnauthorizedResponse()
    )
}

export const SwaggerUnassignPlayerToSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Unassign a player from a song' }),
        ApiCreatedResponse({
            description: 'unassign the player from a song'
        }),

        ForbiddenBackstageResponse(),
        UnauthorizedResponse()
    )
}




