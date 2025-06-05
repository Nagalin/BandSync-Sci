import { ApiProperty } from "@nestjs/swagger"

export class GetCurrentSongResponseDto {
    @ApiProperty({example: '23836c79-9e48-4e1b-babf-443fef4c6412'})
    songId: string

    @ApiProperty({example: 'attention'})
    songName: string
}
