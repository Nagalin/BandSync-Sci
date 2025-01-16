import { View, Text } from 'react-native'
import React from 'react'
import CloseButton from '@/assets/icons/close-square';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const CreateEventForm = () => {
    return (
        <View style={{ height: '100%', flexDirection: 'column' ,justifyContent: 'space-between' }}>
            <CloseButton width={50} height={50} onPress={() => console.log('press')} />
            <Text>สร้าง Event ใหม่</Text>
            <TextInput
                mode='outlined'
                label="ชื่อ Event"
            />




            <TextInput
                mode='outlined'
                label="เวลาเริ่มต้น"
            />


            <TextInput
                mode='outlined'
                label="เวลาสิ้นสุด"
            />

            <TextInput
                mode='outlined'
                label="Dresscode"
            />

            <TextInput
                mode='outlined'
                label="รายละเอียดเพิ่มเติม"
            />
            <Button>ยืนยัน</Button>

        </View>
    )
}

export default CreateEventForm