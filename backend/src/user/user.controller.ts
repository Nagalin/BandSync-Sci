import { Body, Controller, Get, Patch, Post, Request } from '@nestjs/common'
import { UserService } from './user.service';
import { Request as ExpressRequest } from 'express';
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service';
import { DiscordService } from 'src/discord/discord.service';
import { UserRole } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly googleSheetService: GoogleSheetsService,
        private readonly discordService: DiscordService

    ) { }

    @Get()
    async findAll(@Request() req: ExpressRequest) {
        const { discordId } = req.user
        return await this.userService.findAll(discordId)
    }

    @Post()
    async createUser() {
        await this.userService.createUser()

    }

    @Post('/activate')
    async activateUser() {
        const response = await this.googleSheetService.readSheet()
        const discordMemberMapper = await this.discordService.getDiscordMembersMapper()

        response.data.values.map(async currNewMember => {
            const discordUsername = currNewMember[0]
            const userRoleInGoogleSheet = currNewMember[1]
            const discordId = discordMemberMapper[currNewMember[0]]
            const firstname = currNewMember[5].split(' ')[0]
            const lastname = currNewMember[5].split(' ')[1]
            const nickname = currNewMember[4]

            const newUser = {
                discordId: discordId,
                discordUsername: discordUsername,
                firstname: firstname,
                lastname: lastname,
                nickname: nickname,
                userRoleInGoogleSheet: userRoleInGoogleSheet

            }
            this.discordService.addNewUserToDiscordChannel(discordId, userRoleInGoogleSheet)
            this.userService.activateUser(newUser)
        })

    }

    @Patch('/deactivate')
    async deactivateUsers(@Body() body: { userId: string[] }) {
        await this.userService.deactivateUsers(body.userId)
    }

    @Get('/admin-transfer-list')
    async getUsersForAdminTransfer() {
        return this.userService.findAllForAdminTransfer();
    }

}

