import { ApiProperty } from "@nestjs/swagger"

export class CreateAndUpdateEventDto {
  @ApiProperty({example: 'งานเปิดบ้าน'})
  eventName: string

  @ApiProperty({})
  eventDate: Date

  @ApiProperty({})
  startTime: Date  

  @ApiProperty({})
  endTime: Date   

  @ApiProperty({example: 'ชุดนักศึกษา'})
  dressCode: string

  @ApiProperty({example: 'เตรียมตัวหน้าห้อง 14.00'})
  additionalDetails: string
}
