import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async getUser(discordId: string) {
        return await this.prisma.user.findFirst({ where: { discordId } });
    }
}
