import { Controller, Patch, Body, UseGuards, Request as Req } from '@nestjs/common'
import { Request } from 'express'
import { AdminService } from './admin.service'
import { TransferAdminDto } from './dto/transfer-admin.dto'
import { AdminGuard } from '../guard/admin.guard'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('transfer')
  @UseGuards(AdminGuard)
  async transferAdmin(
    @Req() req: Request,
    @Body() dto: TransferAdminDto
  ) {
    const currentAdminId = req.user.userId
    return await this.adminService.transferAdminPrivileges(dto.newAdminId, currentAdminId)
  }
}