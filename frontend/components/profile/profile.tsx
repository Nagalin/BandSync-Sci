import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { getUserService } from '@/services/user.service'

const ReadOnlyField = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.readonlyBox}>
      <Text style={styles.readonlyText}>{value}</Text>
    </View>
  </View>
)

const Profile = () => {
  const { signOut } = useAuth()
  const router = useRouter()

  const { data: user, isFetching } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserService,
  })

  const handleLogout = () => {
    Alert.alert(
      'แจ้งเตือน',
      'คุณต้องการออกจากระบบหรือไม่',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ยืนยัน',
          onPress: async () => {
            await signOut()
            Alert.alert(
              'แจ้งเตือน',
              'ออกจากระบบสำเร็จ')
            router.replace({ pathname: '/' })
          },
        },
      ],
      { cancelable: true }
    )
  }

  if (isFetching || !user) return null

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <ReadOnlyField
          label="ชื่อ-นามสกุล"
          value={`${user.firstName ?? ''} ${user.lastName ?? ''}`}
        />
        <ReadOnlyField label="ชื่อเล่น" value={user.nickName ?? ''} />
        <ReadOnlyField
          label="ตำแหน่ง"
          value={user.roles?.map((r) => r.role).join(', ') ?? ''}
        />
        <ReadOnlyField label="discord ID" value={user.discordId ?? ''} />
        <ReadOnlyField label="discord username" value={user.discordUsername ?? ''} />

        <View style={styles.buttonWrapper}>
          <Button onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f4f4f5',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
    color: '#444',
  },
  readonlyBox: {
    backgroundColor: '#e6e6f0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  readonlyText: {
    fontSize: 16,
    color: '#333',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
})

export default Profile
