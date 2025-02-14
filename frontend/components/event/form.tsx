import React, { useState, useEffect } from 'react';
import {
    View,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Pressable,
} from 'react-native';
import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput as PaperTextInput } from 'react-native-paper';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';
import CloseButton from '@/assets/icons/close-square';
import Text from '@/components/ui/text';
import useCreateEvent from '@/components/event/create/useCreateEvent';

type CreateEventFormPropsType = {
    closeModal?: () => void
    event?: {
        eventId: string
        eventName: string;
        eventDate: Date;
        startTime: Date;
        endTime: Date;
        dressCode: string;
        // additionalDetails: string;
    }
};

const Form = ({
    closeModal,
    event
}: CreateEventFormPropsType) => {
    const [showEventDate, setShowEventDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const {
        control,
        setValue,
        watch,
        errors,
        onSubmit,
    } = useCreateEvent(closeModal,event);

    // Initialize form values with props if provided
    useEffect(() => {
        if (event?.eventName) setValue('eventName', event.eventName);
        if (event?.eventDate) setValue('eventDate', event.eventDate);
        if (event?.startTime) setValue('startTime', event.startTime);
        if (event?.endTime) setValue('endTime', event.endTime);
        if (event?.dressCode) setValue('dressCode', event.dressCode);
    }, [event?.eventName, event?.eventDate, event?.startTime, event?.endTime, event?.dressCode, setValue]);

    return (
        
                <View
                    style={{
                        flexDirection: 'column',
                        gap: 20,
                        padding: 10,
                    }}
                >
                   
                    <Text style={{ fontSize: 30 }}>
                        {event?.eventName ? '' : 'สร้าง Event ใหม่'}
                    </Text>

                    {/* Event Name */}
                    <Controller
                        name="eventName"
                        control={control}
                        rules={{ required: 'กรุณากรอกชื่อ event' }}
                        defaultValue={event?.eventName || ''}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    label="ชื่อ Event"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.eventName && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: -10,
                                        }}
                                    >
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
                            defaultValue={event?.eventDate || new Date()}
                            render={({ field: { value } }) => (
                                <>
                                    <TextInput
                                        label="วว/ดด/ปป"
                                        value={value?.toLocaleDateString()}
                                        editable={false}
                                        right={<PaperTextInput.Icon icon="calendar" />}
                                    />
                                    {errors.eventDate && (
                                        <Text
                                            style={{
                                                color: 'red',
                                                fontSize: 12,
                                                marginTop: 5,
                                            }}
                                        >
                                            {errors.eventDate.message}
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
                                defaultValue={event?.startTime || new Date()}
                                render={({ field: { value } }) => (
                                    <>
                                        <TextInput
                                            style={{ width: 140 }}
                                            label="เวลาเริ่มต้น"
                                            right={<PaperTextInput.Icon icon="timer" />}
                                            value={value?.toLocaleTimeString('th-TH', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                            editable={false}
                                        />
                                        {errors.startTime && (
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    fontSize: 12,
                                                    marginTop: 5,
                                                }}
                                            >
                                                {errors.startTime.message}
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

                        {/* End Time */}
                        <Pressable onPress={() => setShowEndTime(true)}>
                            <Controller
                                name="endTime"
                                control={control}
                                rules={{ required: 'กรุณากรอกเวลาสิ้นสุด' }}
                                defaultValue={event?.endTime || new Date()}
                                render={({ field: { value } }) => (
                                    <>
                                        <TextInput
                                            style={{ width: 140 }}
                                            label="เวลาสิ้นสุด"
                                            right={<PaperTextInput.Icon icon="timer" />}
                                            value={value?.toLocaleTimeString('th-TH', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                            editable={false}
                                        />
                                        {errors.endTime && (
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    fontSize: 12,
                                                    marginTop: 5,
                                                }}
                                            >
                                                {errors.endTime.message}
                                            </Text>
                                        )}
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
                        defaultValue={event?.dressCode || ''}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    label="Dresscode"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.dressCode && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: -10,
                                        }}
                                    >
                                        {errors.dressCode.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />

                    {/* Submit Button */}
                    <Button onPress={onSubmit}>
                        {event?.eventName ? 'อัปเดต' : 'สร้าง'}
                    </Button>
                </View>
            
    );
};

export default Form;