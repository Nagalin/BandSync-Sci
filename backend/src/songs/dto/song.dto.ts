import { ApiProperty } from "@nestjs/swagger";


export class GetSongsListResponseDto {
  @ApiProperty({example: true})
  isAssigned: boolean;

  @ApiProperty({example: '2b232072-6b3c-4044-98e8-6c6655a2ff91'})
  songId: string;

  @ApiProperty({example: 'attention'})
  songName: string;

  @ApiProperty({example: 1})
  songOrder: number;

  @ApiProperty({example: 'C'})
  songKey: string;
}

export class GetSongDetailResponseDto {
  @ApiProperty({ example: 1 })
  songOrder: number;

  @ApiProperty({ example: '2b232072-6b3c-4044-98e8-6c6655a2ff91' })
  eventId: string;

  @ApiProperty({ example: '3c232072-6b3c-4044-98e8-6c6655a2ff92' })
  songId: string;

  @ApiProperty({ example: 'Attention' })
  songName: string;

  @ApiProperty({ example: 'รอ data ปิด' })
  songDescription: string;

  @ApiProperty({ example: 'C' })
  songKey: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=example' })
  songReference: string;

  @ApiProperty({ example: '2' })
  totalVocalist: string;

  @ApiProperty({ example: '1' })
  totalGuitarist: string;

  @ApiProperty({ example: '1' })
  totalDrummer: string;

  @ApiProperty({ example: '1' })
  totalKeyboardist: string;

  @ApiProperty({ example: '0' })
  totalExtra: string;

  @ApiProperty({ example: '1' })
  totalPercussionist: string;

  @ApiProperty({ example: '1' })
  totalBassist: string;
}
