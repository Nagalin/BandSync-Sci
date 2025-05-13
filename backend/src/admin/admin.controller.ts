import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TransferAdminDto } from './dto/transfer-admin.dto';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Patch('transfer')
  @UseGuards(AdminGuard)
  async transferAdmin(@Body() dto: TransferAdminDto) {
    console.log('Controller received DTO:', dto);
    return await this.adminService.transferAdminPrivileges(dto.newAdminId);
  }
}