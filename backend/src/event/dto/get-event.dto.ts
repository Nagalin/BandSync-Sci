import { ApiProperty } from "@nestjs/swagger"
import { Event } from "@prisma/client"

export class GetEventsListResponseDto {
    @ApiProperty({example: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6'})
    eventId: string

    @ApiProperty({example: 'งานเปิดบ้าน'})
    eventName: string

    @ApiProperty()
    eventDate: Date

    @ApiProperty()
    startTime: Date

    @ApiProperty()
    endTime: Date

    @ApiProperty({example: 'UPCOMING'})
    status: Event['status']
}

export class GetEventResponseDto {
    @ApiProperty({example: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6'})
    eventId: string;

    @ApiProperty({example: 'งานเปิดบ้าน'})
    eventName: string;

    @ApiProperty()
    eventDate: Date;

    @ApiProperty()
    startTime: Date;

    @ApiProperty()
    endTime: Date;

    @ApiProperty({example: 'ชุดนักศึกษา'})
    dressCode: string;

    @ApiProperty({example: 'UPCOMING'})
    status: Event['status']

    @ApiProperty({example: 'นัดหมาย 14.00 น.'})
    additionalDetails: string;
}