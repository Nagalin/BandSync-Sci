import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';
import Background from '@/components/ui/background';
import { Link, router } from 'expo-router';
import ListIcon from '@/assets/icons/list';
import EditIcon from '@/assets/icons/edit';

type FormValues = {
    eventName: string;
    eventDate: Date | undefined;
    startTime: Date | undefined;
    endTime: Date | undefined;
    dressCode: string;
    additionalDetails: string;
};

const Index = () => {
    const [showEventDate, setShowEventDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            eventName: 'Event 1',
            eventDate: new Date(),
            startTime: undefined,
            endTime: undefined,
            dressCode: 'เสื้อเหลือง การเกงดำ',
            additionalDetails: '',
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log('Form Data:', data.startTime);
    };

    return (
        <Background style={{
            flexDirection: 'column',
            gap: 20,
            padding: 10,
        }}>
            <Text>(icon edit เฉพาะ backstage)</Text>
            <EditIcon width={40} height={40} style={{alignSelf: 'flex-end', marginRight: 10,}}/>
            {/* Event Name */}
            <Controller
                name="eventName"
                control={control}
                rules={{ required: 'Event name is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            disabled
                            label="ชื่อ Event"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.eventName && (
                            <Text style={{ color: 'red', fontSize: 12 }}>
                                {errors.eventName.message}
                            </Text>
                        )}
                    </>
                )}
            />

            {/* Event Date Picker */}
            <Pressable onPress={() => setShowEventDate(true)}>
                <Controller
                    name="eventDate"
                    control={control}
                    render={({ field: { value } }) => (
                        <TextInput
                            disabled
                            label="วว/ดด/ปป"
                            value={value ? value.toLocaleDateString() : ''}
                            editable={false}
                        />
                    )}
                />
            </Pressable>
            {showEventDate && (
                <DateTimePicker
                    value={watch('eventDate') || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowEventDate(false);
                        if (selectedDate) setValue('eventDate', selectedDate);
                    }}
                />
            )}

            {/* Start and End Time Pickers */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
                {/* Start Time */}
                    <Controller
                        name="startTime"
                        control={control}
                        render={({ field: { value } }) => (
                            <TextInput
                                disabled
                                style={{ width: 120 }}
                                label="เวลาเริ่มต้น"
                                value={
                                    value
                                        ? new Date(value).toLocaleTimeString('th-TH', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })
                                        : ''
                                }
                                
                            />
                        )}
                    />
                {showStartTime && (
                    <DateTimePicker
                        value={watch('startTime') || new Date()}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowStartTime(false);
                            if (selectedTime) setValue('startTime', selectedTime);
                        }}
                    />
                )}

                {showStartTime && (
                    <DateTimePicker
                        value={watch('startTime') || new Date()}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowStartTime(false);
                            if (selectedTime) setValue('startTime', selectedTime);
                        }}
                    />
                )}

                {/* End Time */}
                    <Controller
                        name="endTime"
                        control={control}
                        render={({ field: { value } }) => (
                            <TextInput
                                disabled
                                style={{ width: 120 }}
                                label="เวลาสิ้นสุด"
                                value={
                                    value
                                        ? value.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })
                                        : ''
                                }
                                editable={false}
                            />
                        )}
                    />
                {showEndTime && (
                    <DateTimePicker
                        value={watch('endTime') || new Date()}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowEndTime(false);
                            if (selectedTime) setValue('endTime', selectedTime);
                        }}
                    />
                )}
            </View>

            {/* Dress Code */}
            <Controller
                name="dressCode"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        disabled
                        label="Dresscode"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            {/* Additional Details */}
            <Controller
                name="additionalDetails"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        disabled
                        multiline
                        label="รายละเอียดเพิ่มเติม"
                        style={{ height: 80 }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Button onPress={() => router.push('/song/queue')}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                    alignItems: 'center',
                }}>

                    <ListIcon width={20} height={20} />
                    <Text>
                        ดูรายชื่อเพลง
                    </Text>
                </View>
            </Button>
            <Button onPress={handleSubmit(onSubmit)}>เริ่ม Event</Button>

        </Background>
    )
}

export default Index
