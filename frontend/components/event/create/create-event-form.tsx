import React, { useState } from 'react'
import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Pressable
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import TextInput from '@/components/ui/text-input'
import Button from '@/components/ui/button'
import CloseButton from '@/assets/icons/close-square'

type CreateEventFormPropsType = {
    hideModal: () => void
}

const CreateEventForm = ({ hideModal }: CreateEventFormPropsType) => {
    const [showEventDate, setShowEventDate] = useState(false)
    const [showStartTime, setShowStartTime] = useState(false)
    const [showEndTime, setShowEndTime] = useState(false)
    const [eventDate, setEventDate] = useState<Date | undefined>()
    const [startTime, setStartTime] = useState<Date | undefined>()
    const [endTime, setEndTime] = useState<Date | undefined>()

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowEventDate(false)
        if (selectedDate) setEventDate(selectedDate)
    }

    const onStartTimeChange = (event: any, selectedTime?: Date) => {
        setShowStartTime(false)
        if (selectedTime) setStartTime(selectedTime)
    }

    const onEndTimeChange = (event: any, selectedTime?: Date) => {
        setShowEndTime(false)
        if (selectedTime) setEndTime(selectedTime)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
            >
                <View style={{
                    flex: 1, 
                    flexDirection: 'column', 
                    gap: 20, 
                    padding: 10
                }}
                >
                    <CloseButton
                        onPress={hideModal}
                        style={{ alignSelf: 'flex-end' }}
                        width={60}
                        height={130}
                    />
                    <Text style={{ fontSize: 30, marginTop: -40 }}>
                        สร้าง Event ใหม่
                    </Text>

                    <TextInput mode='outlined' label='ชื่อ Event' />

                    {/* Event Date Picker */}
                    <Pressable onPress={() => setShowEventDate(true)}>
                        <TextInput
                            label='วว/ดด/ปป'
                            value={eventDate ? eventDate.toLocaleDateString() : ''}
                            editable={false}
                        />
                    </Pressable>
                    {showEventDate && (
                        <DateTimePicker
                            value={eventDate || new Date()}
                            mode='date'
                            display='default'
                            onChange={onDateChange}
                        />
                    )}

                    {/* Start Time Picker */}
                    <View style={{ flexDirection: 'row', gap: 10 }}>

                        <Pressable onPress={() => setShowStartTime(true)}>
                            <TextInput
                                style={{ width: 120 }}
                                label='เวลาเริ่มต้น'
                                value={startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                editable={false}
                            />
                        </Pressable>
                        {showStartTime && (
                            <DateTimePicker
                                value={startTime || new Date()}
                                mode='time'
                                display='default'
                                onChange={onStartTimeChange}
                            />
                        )}

                        {/* End Time Picker */}
                        <Pressable onPress={() => setShowEndTime(true)}>
                            <TextInput
                                style={{ width: 120 }}
                                label='เวลาสิ้นสุด'
                                value={endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                editable={false}
                            />
                        </Pressable>
                        {showEndTime && (
                            <DateTimePicker
                                value={endTime || new Date()}
                                mode='time'
                                display='default'
                                onChange={onEndTimeChange}
                            />
                        )}

                    </View>
                    <TextInput label='Dresscode' />
                    <TextInput
                        multiline
                        label='รายละเอียดเพิ่มเติม'
                        style={{ height: 80 }}
                    />
                    <Button>ยืนยัน</Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CreateEventForm
