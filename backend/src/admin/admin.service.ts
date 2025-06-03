import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async transferAdminPrivileges(newAdminId: string, currentAdminId: string) {
        const adminRole = await this.prisma.role.findFirst({
            where: { role: 'admin' }
        })

        if (!adminRole) throw new Error('Admin role not found')

        await this.prisma.user.update({
            where: { userId: newAdminId , isActive: true},
            data: {
                roles: {
                    connect: { roleId: adminRole.roleId }
                }
            }
        })

        await this.prisma.user.update({
            where: { userId: currentAdminId, isActive: true },
            data: {
                roles: {
                    disconnect: { roleId: adminRole.roleId }
                }
            }
        })
    }
}
