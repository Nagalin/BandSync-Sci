import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { applyDecorators } from "@nestjs/common"
import { GetSongDetailResponseDto, GetSongsListResponseDto } from "../dto/song.dto"
import { ForbiddenBackstageResponse, UnauthorizedResponse } from "src/decorators/api-responses.decorator"

export const SwaggerFindAllSongs = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get all songs in an specific event by eventId' }),
        ApiResponse({
            status: 200,
            description: 'Get a song queue by eventId',
            isArray: true,
            type: GetSongsListResponseDto
        }),
        UnauthorizedResponse()
    )
}

export const SwaggerFindOneSong = () => {
    return (
        applyDecorators(
            ApiOperation({ summary: 'Get one song details by songId' }),
            ApiOkResponse({
                description: 'Get a song detail by songId',
                type: GetSongDetailResponseDto
            }),
        UnauthorizedResponse(),
            UnauthorizedResponse()
        )
    )
}

export const SwaggerCreateSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new song in the event queue' }),
        ApiCreatedResponse({
            description: 'Create a new song successfully',
        }),
        UnauthorizedResponse(),
        ForbiddenBackstageResponse()
    )
}

export const SwaggerUpdateSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Update song details' }),
        ApiOkResponse({
            description: 'Update song detail successfully',
        }),
        UnauthorizedResponse(),
        ForbiddenBackstageResponse()
    )
}

export const SwaggerDeleteSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a song from the event' }),
        ApiOkResponse({
            description: 'Delete a song by songId successfully',
        }),
        UnauthorizedResponse(),
        ForbiddenBackstageResponse()
    )
}

export const SwaggerReorderSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Reorder songs in the event queue' }),
        ApiResponse({
            status: 200,
            description: 'Reorder two songs successfully',
        }),
        UnauthorizedResponse(),
        ForbiddenBackstageResponse()

    )
}

export const SwaggerNotificationSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Send notification about a song via Discord' }),
        ApiCreatedResponse({
            description: 'successfully send notification to discord dm via discord bot',
        }),
        UnauthorizedResponse(),
        ForbiddenBackstageResponse()
    )
}
