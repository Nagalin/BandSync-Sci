import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, GoogleSheetsService]
})
export class UserModule {}
