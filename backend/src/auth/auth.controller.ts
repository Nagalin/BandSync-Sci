import { Controller, Get, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
    constructor() { }

    @Get('user')
    @ApiOperation({ summary: 'Get current authenticated user information' })
    @ApiOkResponse({ description: 'Returns the current user information' })
    async getUser(@Request() req: ExpressRequest) {
        return req.user
    }
}