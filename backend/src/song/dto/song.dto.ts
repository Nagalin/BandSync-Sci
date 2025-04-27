export class SongDto {
  songName: string;
  songDescription: string;
  songKey: string;
  songReference: string;
  totalVocalist: string;
  totalGuitarist: string;
  totalDrummer: string;
  totalBassist: string;
  totalKeyboardist: string;
  totalExtra: string;
  totalPercussionist: string;
}

import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SongOrderItemDto {
  songId: string;
  songOrder: number;
}

export class ReorderSongDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SongOrderItemDto)
  songOrder: SongOrderItemDto[];
}