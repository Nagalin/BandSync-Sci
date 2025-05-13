import { Body, Controller, Get, Patch, Post, Request } from '@nestjs/common'
import { UserService } from './user.service';
import { Request as ExpressRequest } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(@Request() req: ExpressRequest) {
        const { discordId } = req.user
        return await this.userService.findAll(discordId)
    }

    @Post()
    async createUser() {
        await this.userService.createUser()

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

