import { Controller, Get, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { Request as ExpressRequest } from 'express'
import { SwaggerFindAllUsers } from './swaggers/user-swagger'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @SwaggerFindAllUsers()
    async findAll(@Request() req: ExpressRequest) {
        const { userId } = req.user
        return await this.userService.findAll()
    }
}

