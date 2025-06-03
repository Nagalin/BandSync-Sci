import { Prisma } from "@prisma/client"

type UserType ={
    userId: string,
    firstName: string
    lastName: string
    nickName: string
    discordId: string
    discordUsername: string
    isActive: boolean
    roles: RolesType[]
}

type RolesType = {
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: UserType
    }
  }
}
