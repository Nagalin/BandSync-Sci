import { Controller, Patch, Body, UseGuards, Request as Req, Post } from '@nestjs/common'
import { Request } from 'express'
import { AdminService } from './admin.service'
import { TransferAdminDto } from './dto/transfer-admin.dto'
import { AdminGuard } from '../guard/admin.guard'
import { UserService } from '../user/user.service'
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service'
import { DiscordService } from 'src/discord/discord.service'
import { ApiResponse } from '@nestjs/swagger'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly googleSheetService: GoogleSheetsService,
    private readonly discordService: DiscordService,
    private readonly userService: UserService,
    private readonly adminService: AdminService
  ) { }

  @ApiResponse({
    status: 201,
    description: 'add new account by reading google sheets successfully'
  })
  @Post('/activate-user')
  @UseGuards(AdminGuard)
  async activeUser() {
    const googleSheetResponse = await this.googleSheetService.readSheet()
    const discordUsernameToIdMap = await this.discordService.getDiscordUsernameToIdMap()

    googleSheetResponse.data.values.map(async curr => {
      const discordUsername = curr[0]
      const userRoleInGoogleSheet = curr[1]
      const discordId = discordUsernameToIdMap[curr[0]]
      const firstname = curr[5].split(' ')[0]
      const lastname = curr[5].split(' ')[1]
      const nickname = curr[4]

      const newUser = {
        discordId: discordId,
        discordUsername: discordUsername,
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        userRoleInGoogleSheet: userRoleInGoogleSheet
      }
      this.userService.activateUser(newUser)
    })

  }

  
  @ApiResponse({
    status: 200,
    description: 'transfer system admin privilege successfully'
  })
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