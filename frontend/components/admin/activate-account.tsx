import { View, StyleSheet, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/ui/button'
import Text from '@/components/ui/text'
import { useQueryClient } from '@tanstack/react-query'
import axios from '@/libs/axios'

const ActivateAccount = () => {
  const queryClient = useQueryClient()

  const addNewAccount = async () => {
    try {
      await axios.post('/user/activate')
      Alert.alert('สำเร็จ','เพิ่มบัญชีสำเร็จ')
      queryClient.invalidateQueries({ queryKey: ['users'] })

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>เพิ่มบัญชีผู้ใช้ใหม่</Text>
      <Button  onPress={addNewAccount}>
        <Text style={styles.buttonText}>เพิ่มบัญชี</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default ActivateAccount
