import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class CreateAndUpdateEventRequestDto {
  @ApiProperty({example: 'งานเปิดบ้าน'})
  @IsString()
  @IsNotEmpty()
  eventName: string

  @ApiProperty()
  // @IsDate()
  @IsNotEmpty()
  eventDate: Date

  @ApiProperty()
  // @IsDate()
  @IsNotEmpty()
  startTime: Date  

  @ApiProperty()
  // @IsDate()
  @IsNotEmpty()
  endTime: Date   

  @ApiProperty({example: 'ชุดนักศึกษา'})
  @IsString()
  @IsNotEmpty()
  dressCode: string

  @ApiProperty({example: 'เตรียมตัวหน้าห้อง 14.00'})
  @IsString()
  additionalDetails: string
}
