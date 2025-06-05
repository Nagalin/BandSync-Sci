import { ApiProperty } from "@nestjs/swagger"

export class GetUserDtoResponse {
    @ApiProperty({ example: '2b232072-6b3c-4044-98e8-6c6655a2ff91' })
    userId: string

    @ApiProperty({ example: 'John Doe' })
    fullName: string
}