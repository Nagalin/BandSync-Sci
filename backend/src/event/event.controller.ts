import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common'
import { EventService } from 'src/event/event.service'
import { EventDto } from 'src/event/dto/event.dto'
import { BackstageGuard } from 'src/guard/auth.guard'
import { ConflictException, NotFoundException } from 'src/exception/custom-exception'

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  async findAll() {
    return await this.eventService.findAll()
  }

  @Get(':eventId')
  async findOne(@Param('eventId') eventId: string) {
    const event = await this.eventService.findOne(eventId)

    if (!event) throw new NotFoundException('Event not found')
    return event
  }

  @Post()
  @UseGuards(BackstageGuard)
  async create(@Body() eventDto: EventDto) {
    const { eventName } = eventDto
    const existingEvent = await this.eventService.findOne(eventName)
    if (existingEvent) throw new ConflictException('Event already exists')

    await this.eventService.create(eventDto)
  }

  @Put(':eventId')
  @UseGuards(BackstageGuard)
  async update(@Param('eventId') eventId: string, @Body() eventDto: EventDto) {
    await this.eventService.update(eventId, eventDto)
  }

  @Delete(':eventId')
  @UseGuards(BackstageGuard)
  async delete(@Param('eventId') eventId: string) {
    await this.eventService.delete(eventId)
  }
}
