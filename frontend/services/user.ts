import axios from "@/libs/axios";

export type User = {
    discordId: string;
    discordUsername: string;
    firstName: string;
    isActive: boolean;
    lastName: string;
    nickName: string;
    roles: Roles[];
    userId: string;
}

type Roles = {
    role: string;
    roleId: string;
}

export const getUserService = async () => {
    const response = await axios.get('/auth/user')
    return response.data as User
}

export const getAssignedPlayerListService = async (songId: string, playerType: string) => {
    const response = await axios.get(`songs/${songId}/player/assigned/${playerType}`)
    return response.data as User[]
}

export const assignPlayerService = async (selectedUsers: Record<string, boolean>, songId: string, playerType: string) => {
    await axios.post(`songs/${songId}/player/assign`, {
        songId: songId,
        playerId: Object.keys(selectedUsers).filter(userId => selectedUsers[userId]),
        playerType: playerType
    })
}

export const unassignPlayerService = async (selectedUsers: Record<string, boolean>, songId: string) => {
    await axios.post(`songs/${songId}/player/unassign`, {
        songId: songId,
        playerId: Object.keys(selectedUsers).filter(userId => !selectedUsers[userId])
    })
}
