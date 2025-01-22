import React, { useState } from 'react';
import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';
import CloseButton from '@/assets/icons/close-square';

type CreateEventFormPropsType = {
    hideModal: () => void;
};

type FormValues = {
    eventName: string;
    eventDate: Date | undefined;
    startTime: Date | undefined;
    endTime: Date | undefined;
    dressCode: string;
    additionalDetails: string;
};

const CreateEventForm = ({ hideModal }: CreateEventFormPropsType) => {
    const [showEventDate, setShowEventDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            eventName: '',
            eventDate: undefined,
            startTime: undefined,
            endTime: undefined,
            dressCode: '',
            additionalDetails: '',
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log('Form Data:', data.startTime);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        gap: 20,
                        padding: 10,
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

                    {/* Event Name */}
                    <Controller
                        name="eventName"
                        control={control}
                        rules={{ required: 'กรุณากรอกชื่อ event' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    label="ชื่อ Event"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.eventName && (
                                    <Text style={{ color: 'red', fontSize: 12, marginTop: -10 }}>
                                        {errors.eventName.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />

                    {/* Event Date Picker */}
                    <Pressable onPress={() => setShowEventDate(true)}>
                        <Controller
                            rules={{ required: 'กรุณากรอกวันเดือนปี' }}
                            name="eventDate"
                            control={control}

                            render={({ field: { value } }) => (
                                <>
                                    <TextInput
                                        label="วว/ดด/ปป"
                                        value={value ? value.toLocaleDateString() : ''}
                                        editable={false}
                                    />
                                    {errors.eventName && (
                                        <Text style={{ color: 'red', fontSize: 12 }}>
                                            {errors.eventDate?.message}
                                        </Text>
                                    )}
                                </>
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
                        <Pressable onPress={() => setShowStartTime(true)}>
                            <Controller
                                name="startTime"
                                control={control}
                                rules={{ required: 'กรุณากรอกเวลาเริ่มต้น' }}
                                render={({ field: { value } }) => (
                                    <>
                                        <TextInput
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
                                            editable={false}
                                        />
                                        {errors.eventName && (
                                            <Text style={{ color: 'red', fontSize: 12 }}>
                                                {errors.startTime?.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />
                        </Pressable>
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
                        <Pressable onPress={() => setShowEndTime(true)}>
                            <Controller
                                name="endTime"
                                control={control}
                                rules={{ required: 'กรุณากรอกเวลาสิ้นสุด' }}
                                render={({ field: { value } }) => (
                                    <>
                                        <TextInput
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
                                        <Text style={{ color: 'red', fontSize: 12 }}>
                                            {errors.endTime?.message}
                                        </Text>
                                    </>
                                )}
                            />
                        </Pressable>
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
                        rules={{ required: 'กรุณากรอก dresscode' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    label="Dresscode"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.dressCode?.message && <Text style={{ color: 'red', fontSize: 12 }}>
                                    {errors.dressCode.message}
                                </Text>}

                            </>
                        )}
                    />

                    {/* Additional Details */}
                    <Controller
                        name="additionalDetails"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline
                                label="รายละเอียดเพิ่มเติม (optional)"
                                style={{ height: 80 }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Button onPress={handleSubmit(onSubmit)}>ยืนยัน</Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateEventForm;
