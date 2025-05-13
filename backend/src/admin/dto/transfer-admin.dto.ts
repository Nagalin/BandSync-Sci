import { IsString } from 'class-validator';

export class TransferAdminDto {
  @IsString()
  newAdminId: string;
}