import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { createClerkClient, verifyToken } from '@clerk/backend'
import { UnauthorizedException } from 'src/exception/custom-exception'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async checkIfUserExist(discordId: string) {
        return await this.prisma.user.findFirst({
            where: { discordId, isActive: true },
            include: { roles: true }
        })
    }

    async getDiscordIdFromSessionToken(sessionToken: string) {
        try {
            const verifiedToken = await verifyToken(sessionToken, {
                jwtKey: process.env.CLERK_JWT_PUBLIC_KEY,
            })
            console.log('sid: ', verifiedToken.sid)
            const user = await clerkClient.users.getUser(verifiedToken.sub)
            return user.externalAccounts[0].externalId

        } catch (error) {
            console.error(error)
            throw new UnauthorizedException('failed to verify session token')
        }

    }
}
