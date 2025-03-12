import { Controller, Get, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

@Controller('auth')
export class AuthController {
    constructor() { }

    @Get('user')
    async getUser(@Request() req: ExpressRequest) {
        return req.user
    }

}