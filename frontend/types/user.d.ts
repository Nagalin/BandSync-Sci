export type UserType = {
    discordId: string
    discordUsername: string
    firstName: string
    isActive: boolean
    lastName: string
    nickName: string
    roles: Roles[]
    userId: string
}

export type RolesType = {
    role: 'vocalist' | 'guitarist' | 'bassist' | 'drummer' | 'Keyboardist' | 'extra' | 'percussionist'
}

export type AssignedPlayerListType = {
    totalPlayer: number
    currentPlayer: number
    players: User[]
}