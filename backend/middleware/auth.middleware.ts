import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../src/auth/auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            const sessionToken = authHeader?.split('Bearer ')[1];
            const discordId = await this.authService.getDiscordIdFromSessionToken(sessionToken);
            const existingUser = await this.authService.checkIfUserExist(discordId);
            if (!existingUser) throw new HttpException('Unauthorized access', HttpStatus.FORBIDDEN);
            
            req.user = existingUser; 
            next();
        } catch (error) {
            console.error(error);
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        }
    }
}

