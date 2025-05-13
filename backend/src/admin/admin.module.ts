import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma.service';
import { AdminGuard } from '../guard/admin.guard';
@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService,AdminGuard]
})
export class AdminModule {}