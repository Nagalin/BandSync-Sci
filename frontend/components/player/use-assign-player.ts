import {  useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { assignPlayerService } from '@/services/user'

const useAssignPlayer = () => {
    const queryClient = useQueryClient()
    const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({})
    
    const handleToggle = (userId: string) => {
        setSelectedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }))
    }

    const assignedPlayer = async (songId: string, playerType: string) => {
        try {
           await assignPlayerService(selectedUsers, songId, playerType)
            queryClient.invalidateQueries({ queryKey: ['assignedPlayerList'] })
            queryClient.invalidateQueries({ queryKey: ['unassignedPlayerList'] })
            
        } catch (error) {
            console.error("Error assigning players: ",error)
            alert('Cannot add more players')
            
        }
    }

    return {
       handleToggle,
       assignedPlayer,
       selectedUsers, 
        
    }
}

export default useAssignPlayer