import { View, Text, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/ui/button'
import axios from '@/libs/axios'

const AddNewAccount = () => {
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
            <Button onPress={() => addNewAccount()}>

                <Text>AddNewAccount</Text>
            </Button>
        </View>
    )
}

export default AddNewAccount