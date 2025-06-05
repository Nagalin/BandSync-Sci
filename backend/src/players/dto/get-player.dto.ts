import { ApiProperty } from "@nestjs/swagger";

export class GetPlayerResponseDto {
    @ApiProperty({ example: '2b232072-6b3c-4044-98e8-6c6655a2ff91' })
    userId: string;

    @ApiProperty({ example: 'John' })
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    lastName: string;

    @ApiProperty({ example: 'Johnny' })
    nickName: string;

    @ApiProperty({ example: '123456789012345678' })
    discordId: string;

    @ApiProperty({ example: 'johndoe#1234' })
    discordUsername: string;

    @ApiProperty({ example: true })
    isActive: boolean;
}

export class GetAssignedPlayResponseDto {
    @ApiProperty({ example: 2 })
    totalPlayer: number;

    @ApiProperty({ example: 1 })
    currentPlayer: number;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                userId: { type: 'string', example: '2b232072-6b3c-4044-98e8-6c6655a2ff91' },
                firstName: { type: 'string', example: 'John' },
                lastName: { type: 'string', example: 'Doe' },
                nickName: { type: 'string', example: 'Johnny' },
                discordId: { type: 'string', example: '123456789012345678' },
                discordUsername: { type: 'string', example: 'johndoe#1234' },
                isActive: { type: 'boolean', example: true }
            }
        }
    })
    players: Array<{
        userId: string;
        firstName: string;
        lastName: string;
        nickName: string;
        discordId: string;
        discordUsername: string;
        isActive: boolean;
    }>;
}

export class GetUnassignedPlayResponseDto {
    @ApiProperty({ example: '29819135-0902-49ce-b9b0-4a4985a817bc' })
    userId: string

    @ApiProperty({ example: 'John' })
    firstName: string

    @ApiProperty({ example: 'Doe' })
    lastName: string

    @ApiProperty({ example: 'August' })
    nickName: string

    @ApiProperty({ example: '123456789' })
    discordId: string

    @ApiProperty({ example: 'xenon' })
    discordUsername: string

    @ApiProperty({ example: true})
    isActive: true
}