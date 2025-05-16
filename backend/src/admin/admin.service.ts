import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async transferAdminPrivileges(newAdminId: string, currentAdminId: string): Promise<void> {
        const adminRole = await this.prisma.role.findFirst({
            where: { role: 'admin' },
        });

        if (!adminRole) throw new Error('Admin role not found');

        // เพิ่ม role admin ให้ user ใหม่
        await this.prisma.user.update({
            where: { userId: newAdminId },
            data: {
                roles: {
                    connect: { roleId: adminRole.roleId },
                },
            },
        });

        // ลบ role admin จาก user เดิม
        await this.prisma.user.update({
            where: { userId: currentAdminId },
            data: {
                roles: {
                    disconnect: { roleId: adminRole.roleId },
                },
            },
        });
    }

}
