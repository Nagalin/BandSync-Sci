import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import axios from '@/libs/axios'
import { unassignPlayerService } from '@/services/user'

const useUnassignPlayer = () => {
    const queryClient = useQueryClient()
    const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({})
    const unassignedPlayer = async (songId: string) => {
        await unassignPlayerService(selectedUsers, songId)
        queryClient.invalidateQueries({ queryKey: ['assignedPlayerList'] })
        queryClient.invalidateQueries({ queryKey: ['unassignedPlayerList'] })
    }


    const handleToggle = (userId: string) => {
        setSelectedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }))
    }

    return {
        selectedUsers,
        setSelectedUsers,
        handleToggle,
        unassignedPlayer
    }
}

export default useUnassignPlayer