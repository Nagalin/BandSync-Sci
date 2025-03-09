import { Body, ConflictException, Controller, Get, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createClerkClient } from '@clerk/backend';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('user')
    async getUser(@Headers('Authorization') authHeader?: string) {
        const token = authHeader?.split('Bearer ')[1];
        const client = await clerkClient.clients.verifyClient(token);
        const session = await clerkClient.sessions.getSession(client.sessionIds[0]);
        const user = await clerkClient.users.getUser(session.userId);
        const discordId = user.externalAccounts[0].externalId
        const existingUser = await this.authService.getUser(discordId);
        if(existingUser) {
            return existingUser;
        }
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
}
