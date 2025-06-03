import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Button from '@/components/ui/button'
import useTransferAdmin from './use-transfer-admin'

const TransferAdminScreen = () => {
    const { selectedUserId, setSelectedUserId, users, handleTransfer } = useTransferAdmin()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>เลือกสมาชิกที่จะรับสิทธิ์ System Admin</Text>
            <Picker
                selectedValue={selectedUserId}
                onValueChange={(itemValue) => setSelectedUserId(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="-- กรุณาเลือกสมาชิก --" value="" />
                {users.map((user) => (
                    <Picker.Item key={user.userId} label={user.fullName} value={user.userId} />
                ))}
            </Picker>

            <Button onPress={handleTransfer}>โอนสิทธิ์</Button>
        </View>
    )
}

export default TransferAdminScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    picker: {
        backgroundColor: '#eee',
    },
})
