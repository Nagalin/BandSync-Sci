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
import Form from '@/components/event/form'

type FormValues = {
    eventName: string
    eventDate: Date | undefined
    startTime: Date | undefined
    endTime: Date | undefined
    dressCode: string
    additionalDetails: string
}

type APIResponse = {
    dressCode: string
    endTime: string
    eventDate: string
    eventName: string
    id: string
    startTime: string
    status: string
}

const Index = () => {
    const { id } = useLocalSearchParams()

    const { data: event } = useQuery<APIResponse>({
        queryKey: ['event-detail'],
        queryFn: async () => {
            return (await axios.get(`/events/${id}`)).data
        }
    })

    // Parse the date strings into Date objects
    const eventDate = event?.eventDate ? new Date(event.eventDate) : undefined
    const startTime = event?.startTime ? new Date(event.startTime) : undefined
    const endTime = event?.endTime ? new Date(event.endTime) : undefined

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
            {/* <Text>(icon edit เฉพาะ backstage)</Text>
            <EditIcon width={40} height={40} style={{ alignSelf: 'flex-end', marginRight: 10, }} /> */}

            <Form
                event={{
                    eventId: event?.id!,
                    eventName: event?.eventName!,
                    eventDate: eventDate!,
                    startTime: startTime!,
                    endTime: endTime!,
                    dressCode: event?.dressCode!
                }}

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