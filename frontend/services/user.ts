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
