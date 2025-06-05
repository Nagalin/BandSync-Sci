import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

export class SongOrderItemDto {
    songId: string
    songOrder: number
}

export class ReorderSongRequestDto {
    @ApiProperty({
        type: [SongOrderItemDto],
        example: [
            { songId: "123e4567-e89b-12d3-a456-426614174000", songOrder: 1 },
            { songId: "123e4567-e89b-12d3-a456-426614174001", songOrder: 2 },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SongOrderItemDto)
    songOrder: SongOrderItemDto[]
}