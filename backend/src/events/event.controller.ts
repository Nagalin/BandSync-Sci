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
import { CreateAndUpdateEventRequestDto } from './dto/create-update-event.dto'
import { BackstageGuard } from '../guards/backstage.guard'
import { ConflictException, NotFoundException } from '../exceptions/custom-exception'
import { SwaggerCreateEvent, SwaggerDeleteEvent, SwaggerEndEvent, SwaggerFindAllEvents, SwaggerFindOneEvent, SwaggerGetCurrentSong, SwaggerStartEvent, SwaggerUpdateCurrentSong, SwaggerUpdateEvent } from './swaggers/event-swagger'

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  @SwaggerFindAllEvents()
  async findAll() {
    return await this.eventService.findAll()
  }

  @Get(':eventId')
  @SwaggerFindOneEvent()
  async findOne(@Param('eventId') eventId: string) {
    const event = await this.eventService.findOne(eventId)

    if (!event) throw new NotFoundException('Event not found')
    return event
  }

  @Post()
  @UseGuards(BackstageGuard)
  @SwaggerCreateEvent()
  async create(@Body() eventDto: CreateAndUpdateEventRequestDto) {
    const { eventName } = eventDto
    const existingEvent = await this.eventService.findByEventName(eventName)
    if (existingEvent) throw new ConflictException('Event already exists')

    await this.eventService.create(eventDto)
  }

  @Put(':eventId')
  @UseGuards(BackstageGuard)
  @SwaggerUpdateEvent()
  async update(@Param('eventId') eventId: string, @Body() eventDto: CreateAndUpdateEventRequestDto) {
    await this.eventService.update(eventId, eventDto)
  }

  @Delete(':eventId')
  @UseGuards(BackstageGuard)
  @SwaggerDeleteEvent()
  async delete(@Param('eventId') eventId: string) {
    await this.eventService.delete(eventId)
  }

  @Get(':eventId/current-song')
  @SwaggerGetCurrentSong()
  async findCurrentSong(@Param('eventId') eventId: string) {
    const currentSong = await this.eventService.findCurrentSong(eventId)
    return currentSong
  }

  @Put(':eventId/current-song')
  @UseGuards(BackstageGuard)
  @SwaggerUpdateCurrentSong()
  async updateCurrentSong(@Param('eventId') eventId: string) {
    await this.eventService.updateCurrentSong(eventId)
  }



  @Patch(':eventId/end')
  @UseGuards(BackstageGuard)
  @SwaggerEndEvent()
  async endEvent(@Param('eventId') eventId: string) {
    this.eventService.endEvent(eventId)
  }

  @Patch(':eventId/start')
  @UseGuards(BackstageGuard)
  @SwaggerStartEvent()
  async start(@Param('eventId') eventId: string) {
    await this.eventService.start(eventId)
  }
}
