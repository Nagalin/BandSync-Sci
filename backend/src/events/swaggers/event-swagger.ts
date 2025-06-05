import { applyDecorators } from "@nestjs/common"
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger"
import { GetEventResponseDto, GetEventsListResponseDto } from "../dto/get-event.dto"
import { BadRequestResponse, ForbiddenBackstageResponse, UnauthorizedResponse } from "src/decorators/api-responses.decorator"
import { GetCurrentSongResponseDto } from "../dto/get-current-song.dto"

export const SwaggerFindAllEvents = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get all the events' }),
        ApiOkResponse({
            description: 'Retrieved all events successfully',
            type: GetEventsListResponseDto,
            isArray: true
        }),
        UnauthorizedResponse()
    )
}

export const SwaggerFindOneEvent = () => {
    return (
        applyDecorators(
            ApiOperation({ summary: 'Get one event detail by eventId' }),
            ApiOkResponse({
                description: 'Retrived one event detail by eventId successfully',
                type: GetEventResponseDto
            }),
            UnauthorizedResponse()
        )
    )
}

export const SwaggerGetCurrentSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get current song of running event' }),
        ApiOkResponse({
            description: 'Retrieved current song of the running event successfully',
            type: GetCurrentSongResponseDto
        }),
        UnauthorizedResponse()
    )
}

export const SwaggerUpdateCurrentSong = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Update current song of running event' }),
        ApiOkResponse({
            description: 'Update current song of running event successfully',
            type: GetCurrentSongResponseDto
        }),
        UnauthorizedResponse(),
        ForbiddenBackstageResponse()
    )
}

export const SwaggerCreateEvent = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new event' }),
        ApiCreatedResponse({ description: 'Create a new event successfully', }),
        ApiConflictResponse({
            description: 'Event with this name already exists',
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Event already exists'
                    }
                }
            }
        }),
        BadRequestResponse(),
        UnauthorizedResponse(),
        ForbiddenBackstageResponse()
    )
}

export const SwaggerEndEvent = () => {
    return applyDecorators(
        ApiOperation({ summary: 'End an event and mark it as completed' }),
        ApiOkResponse({ description: 'Update event status to COMPLETED after the event end' }),
        UnauthorizedResponse(),
        ForbiddenBackstageResponse()
    )
}

export const SwaggerUpdateEvent = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Update event details' }),
        ApiOkResponse({
            description: 'Update event detail by eventId successfully',
        }),
        ForbiddenBackstageResponse(),
        UnauthorizedResponse()

    )
}

export const SwaggerDeleteEvent = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Delete an event and its associated songs' }),
        ApiOkResponse({
            description: 'Delete event and its songs by eventId successfully',
        }),
        ForbiddenBackstageResponse(),
        UnauthorizedResponse()
    )
}

export const SwaggerStartEvent = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Start an event, mark status as ONGOING and mark the first song as current song' }),
        ApiOkResponse({
            description: 'Update event status to ONGOING',
        }),
        ForbiddenBackstageResponse(),
        UnauthorizedResponse()
    )
}

