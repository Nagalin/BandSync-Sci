import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// @Injectable() ทำให้ PrismaService สามารถถูก inject เข้ามาใน Controller ได้
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();  // เรียกใช้ PrismaClient ซึ่งจะเชื่อมต่อกับฐานข้อมูล
  }
}
