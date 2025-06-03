import axios from '@/libs/axios'
import { AssignedPlayerListType, UserType } from '@/types/user'

export const getUserService = async () => {
    const response = await axios.get<UserType>('/auth/user')
    return response.data
}

export const getAssignedPlayerListService = async (songId: string, playerType: string) => {
    const response = await axios.get<AssignedPlayerListType>(`songs/${songId}/player/assigned/${playerType}`)
    return response.data 
}

export const getUnassignedPlayerListService = async (songId: string, playerType: string) => {
    const response = await axios.get<UserType[]>(`songs/${songId}/player/unassigned/${playerType}`)
    return response.data
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
