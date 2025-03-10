import { 
    Controller, 
    Get, 
    Headers, 
    HttpException, 
    HttpStatus
 } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('user')
    async getUser(@Headers('Authorization') authHeader: string) {
        const sessionToken = authHeader?.split('Bearer ')[1]
        const discordId = await this.authService.getDiscordIdFromSessionToken(sessionToken)
        const existingUser = await this.authService.getUser(discordId)

        if (existingUser) return existingUser
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
}