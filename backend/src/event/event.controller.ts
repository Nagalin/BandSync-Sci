import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch
} from '@nestjs/common'
import { EventService } from './event.service'
import { CreateAndUpdateEventDto } from './dto/create-update.dto'
import { BackstageGuard } from '../guard/backstage.guard'
import { ConflictException, NotFoundException } from '../exception/custom-exception'
import { ApiResponse } from '@nestjs/swagger'
import { GetEventResponseDto, GetEventsListResponseDto } from './dto/get-event.dto'
import { GetCurrentSongDto } from './dto/get-current-song.dto'

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @ApiResponse({
    status: 200,
    description: 'Get all events',
    type: GetEventsListResponseDto,
    isArray: true
  })
  @Get()
  async findAll() {
    return await this.eventService.findAll()
  }

  @ApiResponse({
    status: 200,
    description: 'Get one event detail by eventId',
    type: GetEventResponseDto
  })
  @Get(':eventId')
  async findOne(@Param('eventId') eventId: string) {
    const event = await this.eventService.findOne(eventId)

    if (!event) throw new NotFoundException('Event not found')
    return event
  }

  @ApiResponse({
    status: 200,
    description: 'Get current song of events',
    type: GetCurrentSongDto
  })
  @Get(':eventId/current-song')
  async findCurrentSong(@Param('eventId') eventId: string) {
    const currentSong = await this.eventService.findCurrentSong(eventId)
    return currentSong
  }

  @ApiResponse({
    status: 200,
    description: 'Update current song of events',
    type: GetCurrentSongDto
  })
  @Put(':eventId/current-song')
  @UseGuards(BackstageGuard)
  async updateCurrentSong(@Param('eventId') eventId: string) {
    await this.eventService.updateCurrentSong(eventId)
  }

  @ApiResponse({
    status: 201,
    description: 'Create a new event successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Event with this name already exists',
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized - Backstage access required',
  })
  @Post()
  @UseGuards(BackstageGuard)
  async create(@Body() eventDto: CreateAndUpdateEventDto) {
    const { eventName } = eventDto
    const existingEvent = await this.eventService.findByEventName(eventName)
    if (existingEvent) throw new ConflictException('Event already exists')
      else 
    await this.eventService.create(eventDto)
  }

  @ApiResponse({
    status: 200,
    description: 'Update event status to COMPLETED after the event end',
  })
  @Patch(':eventId/end')
  @UseGuards(BackstageGuard)
  async endEvent(@Param('eventId') eventId: string) {
    this.eventService.endEvent(eventId)
  }

  @ApiResponse({
    status: 200,
    description: 'Update event detail by eventId',
  })
  @Put(':eventId')
  @UseGuards(BackstageGuard)
  async update(@Param('eventId') eventId: string, @Body() eventDto: CreateAndUpdateEventDto) {
    await this.eventService.update(eventId, eventDto)
  }

  @ApiResponse({
    status: 200,
    description: 'Delete event and its songs by eventId',
  })
  @Delete(':eventId')
  @UseGuards(BackstageGuard)
  async delete(@Param('eventId') eventId: string) {
    await this.eventService.delete(eventId)
  }

  @ApiResponse({
    status: 200,
    description: 'Update event status to ONGOING',
  })
  @Post(':eventId/start')
  @UseGuards(BackstageGuard)
  async start(@Param('eventId') eventId: string) {
    await this.eventService.start(eventId)
  }
}
