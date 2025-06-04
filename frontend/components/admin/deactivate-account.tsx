import { View, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper'
import Button from '@/components/ui/button'
import Text from '@/components/ui/text'
import useDeactivateAccount from './use-deactivate-account'

const DeactivateAccount = () => {
  const {
    users,
    isFetching,
    handleToggle,
    selectedUsers,
    deactivate
  } = useDeactivateAccount()
  

  if (isFetching) return null

  return (
    <View style={styles.card}>
      <Text style={styles.header}>เลือกผู้ใช้ที่ต้องการปิดบัญชี</Text>

      {users!
        .map((user) => (
          <View key={user.userId} style={styles.userRow}>
            <Text style={styles.userText}>{user.fullName}</Text>
            <Checkbox
              status={selectedUsers[user.userId] ? 'checked' : 'unchecked'}
              onPress={() => handleToggle(user.userId)}
            />
          </View>
        ))}

      <Button
        onPress={() => {
          const confirmedUsers = Object.keys(selectedUsers).filter(
            (userId) => selectedUsers[userId]
          )

          if (confirmedUsers.length === 0) {
            Alert.alert('แจ้งเตือน', 'กรุณาเลือกผู้ใช้ก่อนปิดบัญชี')
            return
          }

          Alert.alert(
            'ยืนยันการปิดบัญชี',
            'คุณต้องการปิดบัญชีผู้ใช้ที่เลือกหรือไม่',
            [
              { text: 'ยกเลิก', style: 'cancel' },
              {
                text: 'ยืนยัน',
                onPress: () => deactivate(),
              },
            ]
          )
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>ปิดบัญชี</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f4f4f5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userText: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    marginTop: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
})

export default DeactivateAccount
