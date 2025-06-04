import axios from '@/libs/axios'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { Alert } from 'react-native'

const useTransferAdmin = () => {
    const [users, setUsers] = useState<{ userId: string, fullName: string }[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const router = useRouter()
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get<{ userId: string, fullName: string }[]>('/user')
          const currentUserId = await SecureStore.getItemAsync('userId')
          const filteredUsers = response.data.filter(
            (user) => user.userId !== currentUserId
          )
          setUsers(filteredUsers)
        } catch (err) {
          Alert.alert('Error', 'ไม่สามารถโหลดรายชื่อผู้ใช้ได้')
        }
      }
      fetchUsers()
    }, [])
  
    const handleTransfer = () => {
      if (!selectedUserId) {
        Alert.alert('กรุณาเลือกผู้ใช้ที่ต้องการถ่ายโอน')
        return
      }
  
      Alert.alert(
        'โปรดยืนยันการโอนสิทธิ์ System admin',
        'การดำเนินการนี้จะไม่สามารถย้อนกลับได้',
        [
          { text: 'ยกเลิก', style: 'cancel' },
          {
            text: 'ยืนยัน',
            onPress: async () => {
              try {
                await axios.patch('/admin/transfer', { newAdminId: selectedUserId })
  
                const storedRoles = await SecureStore.getItemAsync('roles')
                if (storedRoles) {
                  const parsedRoles = JSON.parse(storedRoles)
                  const updatedRoles = parsedRoles.filter((role: string) => role !== 'admin')
                  await SecureStore.setItemAsync('roles', JSON.stringify(updatedRoles))
                }
  
                Alert.alert('สำเร็จ', 'โอนสิทธิ์สำเร็จแล้ว')
                router.replace('/main-menu')
              } catch (error) {
                Alert.alert('ผิดพลาด', 'ไม่สามารถโอนสิทธิ์ได้')
              }
            },
          },
        ]
      )
    }

    return {
        handleTransfer,
        users,
        selectedUserId,
        setSelectedUserId
    }
}

export default useTransferAdmin