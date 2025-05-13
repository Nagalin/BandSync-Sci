import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAll(discordId: string) {
        return await this.prisma.user.findMany({
            where: {
                NOT: {
                    discordId
                }
            }
        })

    }

    async createUser() {
        await this.prisma.user.create({
            data: {
                discordId: '1326177826277294173',
                discordUsername: 'bass',
                firstName: 'bassist',
                lastName: 'something',
                nickName: 'first',
                isActive: true,
                roles: { connect: { roleId: '60338d55-b0b8-4930-b624-27c9f93644ae' } }

            }
        })
    }

    async deactivateUsers(userId: string[]) {
        return await this.prisma.user.updateMany({
            where: {
                userId: {
                    in: userId
                },
            },

            data: {
                isActive: false
            }
        })

    }

    async findAllForAdminTransfer() {
        const users = await this.prisma.user.findMany({
            where: {
                isActive: true,
            },
            select: {
                userId: true,
                firstName: true,
                lastName: true,
            }
        });

        return users.map(user => ({
            userId: user.userId,
            fullName: `${user.firstName} ${user.lastName}`,
        }));
    }

}
