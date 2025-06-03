import axios from '@/libs/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Alert } from 'react-native'

const useActivateAccount = () => {
    const queryClient = useQueryClient()
    const [isPending, setIsPeding] = useState(false)

    const addNewAccountMutation = useMutation({
        mutationFn: async () => {
            setIsPeding(true)
            await axios.post('/admin/activate-user')
        },

        onSuccess: () => {
            Alert.alert('สำเร็จ', 'เพิ่มบัญชีสำเร็จ')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },

        onError: (error) => {
            console.error(error)
        },
        
        onSettled: () => {
            setIsPeding(false)
        }
    })

    const addNewAccount = async () => {
       addNewAccountMutation.mutate()
    }

    return {
        isPending,
        addNewAccount
    }
}

export default useActivateAccount