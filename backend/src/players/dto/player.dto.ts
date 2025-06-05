import { ApiProperty } from "@nestjs/swagger";

export enum PlayerType {
    VOCALIST = 'vocalist',
    GUITARIST = 'guitarist',
    BASSIST = 'bassist',
    DRUMMER = 'drummer',
    KEYBOARDIST = 'Keyboardist',
    EXTRA = 'extra',
    PERCUSSIONIST = 'percussionist'
}

export class PlayerDto {
    @ApiProperty({
        enum: PlayerType,
        example: PlayerType.VOCALIST,
        description: 'Type of player role'
    })
    playerType: PlayerType

    @ApiProperty({
        type: [String],
        example: ['2b232072-6b3c-4044-98e8-6c6655a2ff91'],
        description: 'Array of player IDs',
        required: false
    })
    playerId?: string[]

    @ApiProperty({
        example: '3c232072-6b3c-4044-98e8-6c6655a2ff92',
        description: 'ID of the song',
        required: false
    })
    songId?: string
}

