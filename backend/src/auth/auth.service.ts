import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createClerkClient, verifyToken } from '@clerk/backend'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

@Injectable({scope: Scope.REQUEST})
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async checkIfUserExist(discordId: string) {
        return await this.prisma.user.findFirst({
            where: { discordId, isActive: true },
            include: { roles: true }
        });
    }

    async getDiscordIdFromSessionToken(sessionToken: string) {
        const verifiedToken = await verifyToken(sessionToken, {
            jwtKey: process.env.CLERK_JWT_PUBLIC_KEY,
        })
        const user = await clerkClient.users.getUser(verifiedToken.sub)
        return user.externalAccounts[0].externalId
    }
}
