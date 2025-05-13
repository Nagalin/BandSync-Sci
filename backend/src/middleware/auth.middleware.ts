import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }

    async use(req: Request, _res: Response, next: NextFunction) {
            const authHeader = req.headers.authorization
            if(!authHeader) throw new UnauthorizedException('Missing authorzation header')
                
            const sessionToken = authHeader?.split('Bearer ')[1];
            const discordId = await this.authService.getDiscordIdFromSessionToken(sessionToken);
           
            const existingUser = await this.authService.checkIfUserExist(discordId);
            if (!existingUser) throw new UnauthorizedException('Your account does not have access to this application');
            (req as any).user = existingUser;
            next()
        
    }
}

