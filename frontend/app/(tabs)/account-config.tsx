import React from 'react'
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native'
import Text from '@/components/ui/text'
import ActivateAccount from '@/components/admin/activate-account'
import DeactivateAccount from '@/components/admin/deactivate-account'

const screenWidth = Dimensions.get('window').width

const AccountConfig = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>การตั้งค่าบัญชีผู้ใช้</Text>

        <View style={styles.card}>
          <ActivateAccount />
        </View>

        <View style={styles.card}>
          <DeactivateAccount />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // หรือ '#121212' ถ้า dark mode
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: screenWidth * 0.9,
    alignSelf: 'center',
  },
})

export default AccountConfig
