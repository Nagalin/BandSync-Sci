import { Body, Controller, Get, Patch, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { Request as ExpressRequest } from 'express'
import { ApiResponse } from '@nestjs/swagger'
import { GetUserDtoResponse } from './dto/get-user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiResponse({
        status: 200,
        description: 'retrieved user successfully',
        isArray: true,
        type: GetUserDtoResponse
    })
    @Get()
    async findAll(@Request() req: ExpressRequest) {
        const { userId } = req.user
        return await this.userService.findAll()
    }

}

