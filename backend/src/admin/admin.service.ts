import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async transferAdminPrivileges(newAdminId: string): Promise<void> {
        // Step 1: ลบความสัมพันธ์ admin ทั้งหมดในตาราง _UserRoles
        await this.prisma.$executeRawUnsafe(`
    DELETE FROM "_UserRoles"
    WHERE "B" IN (
      SELECT "roleId" FROM "Role"
      WHERE role = 'admin'
    )
  `);

        // Step 2: ดึง roleId ของ role admin
        const adminRole = await this.prisma.role.findFirst({
            where: { role: 'admin' },
        });

        if (!adminRole) throw new Error('Admin role not found');

        // Step 3: สร้างความสัมพันธ์ admin ใหม่ให้ผู้ใช้ที่เลือก
        await this.prisma.user.update({
            where: { userId: newAdminId },
            data: {
                roles: {
                    connect: { roleId: adminRole.roleId },
                },
            },
        });
        console.log('Transferring admin to:', newAdminId);
    }

}
