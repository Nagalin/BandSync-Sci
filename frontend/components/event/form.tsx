import React, { useState } from 'react'
import { View, Pressable } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { Controller } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker'
import TextInput from '@/components/ui/text-input'
import Button from '@/components/ui/button'
import Text from '@/components/ui/text'
import FormController from '@/components/ui/form-controller'
import useEventForm from '@/components/event/use-event-form'
import { checkBackstageRole } from '@/utils/check-user-role'

type FormPropsType = {
    closeModalImmediately?: () => void
    event?: {
        eventId: string
        eventName: string
        eventDate: Date
        startTime: Date
        endTime: Date
        dressCode: string
        additionalDetails: string
    }
}

const Form = ({ closeModalImmediately, event }: FormPropsType) => {
    const isUserBackstage = checkBackstageRole()
    const editable = isUserBackstage
    const [showEventDate, setShowEventDate] = useState(false)
    const [showStartTime, setShowStartTime] = useState(false)
    const [showEndTime, setShowEndTime] = useState(false)
    const {
        control,
        setValue,
        watch,
        onSubmit,
        deleteEvent
    } = useEventForm(closeModalImmediately, event)

    return (
        <View style={{ gap: 20, padding: 10 }}>

            <Text style={{ fontSize: 30 }}>
                {event?.eventName ? '' : 'สร้าง Event ใหม่'}
            </Text>

            {/* Event Name */}
            <FormController
                name='eventName'
                control={control}
                label='ชื่อ Event'
                rules={{ required: 'กรุณากรอกชื่อ event' }}
                editable={editable}
            />

            {/* Event Date Picker */}
            <Pressable onPress={() => setShowEventDate(true)}>
                <FormController
                    rules={{ required: 'กรุณากรอกวันเดือนปี' }}
                    name='eventDate'
                    control={control}
                    defaultValue={event?.eventDate || new Date()}
                    render={({ field: { value } }) => (
                        <>
                            <TextInput
                                label='วว/ดด/ปป'
                                value={value?.toLocaleDateString()}
                                right={<PaperTextInput.Icon icon='calendar' />}
                                editable={false}
                            />
                        </>
                    )}
                />
            </Pressable>
            {showEventDate && (
                <DateTimePicker
                    value={watch('eventDate') || new Date()}
                    mode='date'
                    display='default'
                    onChange={(event, selectedDate) => {
                        setShowEventDate(false)
                        if (selectedDate) setValue('eventDate', selectedDate)
                    }}
                />
            )}

            {/* Start Time */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable onPress={() => setShowStartTime(true)}>
                    <Controller
                        name='startTime'
                        control={control}
                        rules={{ required: 'กรุณากรอกเวลาเริ่มต้น' }}
                        defaultValue={event?.startTime || new Date()}
                        render={({ field: { value } }) => (
                            <>
                                <TextInput
                                    style={{ width: 140 }}
                                    label='เวลาเริ่มต้น'
                                    right={<PaperTextInput.Icon icon='timer' />}
                                    value={value?.toLocaleTimeString('th-TH', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    editable={false}
                                />
                            </>
                        )}
                    />
                </Pressable>
                {showStartTime && (
                    <DateTimePicker
                        value={watch('startTime') || new Date()}
                        mode='time'
                        display='default'
                        onChange={(event, selectedTime) => {
                            setShowStartTime(false)
                            if (selectedTime) setValue('startTime', selectedTime)
                        }}
                    />
                )}

                {/* End Time */}
                <Pressable onPress={() => setShowEndTime(true)}>
                    <Controller
                        name='endTime'
                        control={control}
                        rules={{ required: 'กรุณากรอกเวลาสิ้นสุด' }}
                        defaultValue={event?.endTime || new Date()}
                        render={({ field: { value } }) => (
                            <>
                                <TextInput
                                    style={{ width: 140 }}
                                    label='เวลาสิ้นสุด'
                                    right={<PaperTextInput.Icon icon='timer' />}
                                    value={value?.toLocaleTimeString('th-TH', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    editable={false}
                                />
                            </>
                        )}
                    />
                </Pressable>
                {showEndTime && (
                    <DateTimePicker
                        value={watch('endTime') || new Date()}
                        mode='time'
                        display='default'
                        onChange={(event, selectedTime) => {
                            setShowEndTime(false)
                            if (selectedTime) setValue('endTime', selectedTime)
                        }}
                    />
                )}
            </View>

            {/* Dress Code */}
            <FormController
                name='dressCode'
                control={control}
                label='Dresscode'
                rules={{ required: 'กรุณากรอกชื่อ dresscode' }}
                editable={editable}
            />


            {/* additional detail */}
            <FormController
                name='additionalDetails'
                control={control}
                label='รายละเอียดเพิ่มเติม (optional)'
                editable={editable}
            />

            {/* Submit Button */}
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: 20
            }}
            >

                {isUserBackstage ? (
                    <>

                        <Button onPress={onSubmit} style={{ width: '90%' }}>
                            {event ? 'อัปเดต' : 'สร้าง'}
                        </Button>
                        {event &&
                            <Button
                                style={{ width: '90%' }}
                                variant='danger'
                                onPress={() => deleteEvent()}>
                                ลบ Event
                            </Button>}
                    </>

                ) : null}

            </View>
        </View>
    )
}

export default Form

