
import axios from '@/libs/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Alert } from 'react-native'

type UsersType = {
  userId: string
  fullName: string
  isActive: boolean
}

const useDeactivateAccount = () => {
  const { data: users, isFetching } = useQuery<UsersType[]>({
    queryKey: ['users'],
    queryFn: async () => (await axios.get('/user')).data,
  })

  const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({})
  
  const deactivateMutation = useMutation({
    mutationFn: async () =>
      await axios.patch('/admin/deactivate', {
        userId: Object.keys(selectedUsers).filter((userId) => selectedUsers[userId]),
      }),
    onSuccess: () => {
      Alert.alert('สำเร็จ', 'ปิดบัญชีสำเร็จแล้ว')
    },
  })

  const deactivate = () => deactivateMutation.mutate()

  const handleToggle = (userId: string) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  return {
    users,
    isFetching,
    handleToggle,
    selectedUsers,
    deactivate
  }
}

export default useDeactivateAccount