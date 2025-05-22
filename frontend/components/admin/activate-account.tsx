import { View, Text, Alert } from 'react-native'
import React from 'react'
import Button from '../ui/button'
import axios from '@/libs/axios'

const ActivateAccount = () => {
    const addNewAccount = async () => {
        try {
            
            await axios.get('/google-sheets/read')
            Alert.alert('เพิ่มบัญชีสำเร็จ')
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <View>
            <Text>เพิ่มบัญชีครับ (header)</Text>
            <Button onPress={() => addNewAccount()}>

                <Text>Add New Account</Text>
            </Button>
        </View>
    )
}

export default ActivateAccount