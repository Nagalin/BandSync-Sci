import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { Link, useLocalSearchParams } from 'expo-router'
import TextInput from '@/components/ui/text-input'
import Button from '@/components/ui/button'
import Background from '@/components/ui/background'
import ListIcon from '@/assets/icons/list'
import EditIcon from '@/assets/icons/edit'
import Text from '@/components/ui/text'
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

type FormValues = {
    eventName: string
    eventDate: Date | undefined
    startTime: Date | undefined
    endTime: Date | undefined
    dressCode: string
    additionalDetails: string
}

type APIResponse = {
    dressCode: string;
    endTime:   string; // Change to string
    eventDate: string; // Change to string
    eventName: string;
    id:        string;
    startTime: string; // Change to string
    status:    string;
}

const Index = () => {
    const { id } = useLocalSearchParams()

    console.log(id)
    const { data: event } = useQuery<APIResponse>({
        queryKey: ['event-detail'],
        queryFn: async () => {
            return (await axios.get(`/events/${id}`)).data
        }
    })

    // Parse the date strings into Date objects
    const eventDate = event?.eventDate ? new Date(event.eventDate) : undefined;
    const startTime = event?.startTime ? new Date(event.startTime) : undefined;
    const endTime = event?.endTime ? new Date(event.endTime) : undefined;

    const formValues: FormValues = {
        eventName: event?.eventName!,
        eventDate: eventDate,
        startTime: startTime,
        endTime: endTime,
        dressCode: event?.dressCode!,
        additionalDetails: '',
    }

    return (
        <Background style={{
            flexDirection: 'column',
            gap: 20,
            padding: 10,
        }}>
            <Text>(icon edit เฉพาะ backstage)</Text>
            <EditIcon width={40} height={40} style={{ alignSelf: 'flex-end', marginRight: 10, }} />

            {/* Event Name */}
            <TextInput
                disabled
                label="ชื่อ Event"
                value={formValues.eventName}
            />

            {/* Event Date */}
            <TextInput
                disabled
                label="วว/ดด/ปป"
                right={<PaperTextInput.Icon icon="calendar" />}
                value={formValues.eventDate ? formValues.eventDate.toLocaleDateString() : ''}
            />

            {/* Start and End Time */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
                {/* Start Time */}
                <TextInput
                    disabled
                    label="เวลาเริ่มต้น"
                    style={{ width: 140 }}
                    right={<PaperTextInput.Icon icon="timer" />}
                    value={
                        formValues.startTime
                            ? formValues.startTime.toLocaleTimeString('th-TH', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : ''
                    }
                />

                {/* End Time */}
                <TextInput
                    disabled
                    label="เวลาสิ้นสุด"
                    style={{ width: 140 }}
                    right={<PaperTextInput.Icon icon="timer" />}
                    value={
                        formValues.endTime
                            ? formValues.endTime.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : ''
                    }
                />
            </View>

            {/* Dress Code */}
            <TextInput
                disabled
                label="Dresscode"
                value={formValues.dressCode}
            />

            {/* Additional Details */}
            <TextInput
                disabled
                multiline
                label="รายละเอียดเพิ่มเติม"
                style={{ height: 80 }}
                value={formValues.additionalDetails}
            />

            <Link href="/song" asChild>
                <Pressable>
                    <Button >
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
                </Pressable>
            </Link>
            <Button>เริ่ม Event (เฉพาะ backstage)</Button>
        </Background>
    )
}

export default Index