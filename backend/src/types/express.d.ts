// src/types/express.d.ts

import { Prisma } from "@prisma/client";


type UserType ={
    userId: string,
    firstName: string
    lastName: string
    nickName: string
    discordId: strin
    discordUsername: string
    isActive: boolean
    roles: RolesType[]
}

type RolesType = {
  roleId: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: UserType;  // Add the `user` property to the Request object
    }
  }
}
