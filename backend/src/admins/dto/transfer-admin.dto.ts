import { ApiProperty } from "@nestjs/swagger";

export class TransferAdminRequestDto {
  @ApiProperty({example: 'e3e3ee51-f1a2-4a2c-9a8d-4e40732bf3eb'})
  newAdminId: string
}