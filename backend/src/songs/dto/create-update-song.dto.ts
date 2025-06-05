import { ApiProperty } from '@nestjs/swagger';

export class CreateAndUpdateSongRequestDto {
  @ApiProperty({ example: 'attention' })
  songName: string

  @ApiProperty({ example: 'รอ data ค่อยขึ้น' })
  songDescription: string

  @ApiProperty({ example: 'C' })
  songKey: string

  @ApiProperty({ example: 'https://www.youtube.com/watch?v=2gLUXIhrz7Q' })
  songReference: string

  @ApiProperty({ example: 2 })
  totalVocalist: string

  @ApiProperty({ example: 1 })
  totalGuitarist: string

  @ApiProperty({ example: 1 })
  totalDrummer: string

  @ApiProperty({ example: 1 })
  totalBassist: string

  @ApiProperty({ example: 1 })
  totalKeyboardist: string

  @ApiProperty({ example: 1 })
  totalExtra: string

  @ApiProperty({ example: 1 })
  totalPercussionist: string
}
