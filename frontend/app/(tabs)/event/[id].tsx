import React from 'react'
import { Pressable, View } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'
import Button from '@/components/ui/button'
import Background from '@/components/ui/background'
import Text from '@/components/ui/text'
import Form from '@/components/event/form'
import ListIcon from '@/assets/icons/list'
import DetailLoading from '@/components/event/view/detail-loading'

type APIResponse = {
    dressCode: string
    endTime: string
    eventDate: string
    eventName: string
    id: string
    startTime: string
    status: string
    additionalDetails: string
}

const Index = () => {
    const { id } = useLocalSearchParams()

    const { data: event, isFetching } = useQuery<APIResponse>({
        queryKey: ['event-detail'],
        queryFn: async () => {
            return (await axios.get(`/events/${id}`)).data
        }
    })

    if (isFetching) return <DetailLoading />

    const eventDate = event?.eventDate ? new Date(event.eventDate) : undefined
    const startTime = event?.startTime ? new Date(event.startTime) : undefined
    const endTime = event?.endTime ? new Date(event.endTime) : undefined

    return (
        <Background style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 20,
            padding: 10,
        }}>

            <View style={{ marginTop: -60 }}>
                <Form
                    event={{
                        eventId: event?.id!,
                        eventName: event?.eventName!,
                        eventDate: eventDate!,
                        startTime: startTime!,
                        endTime: endTime!,
                        dressCode: event?.dressCode!,
                        additionalDetails: event?.additionalDetails!
                    }}
                />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>


            <Button  style={{width: '90%'}}>เริ่ม Event </Button>
            </View>
            <Link href="/song" asChild  style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Pressable>
                    <Button style={{width: '90%'}}>
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
        </Background>
    )
}

export default Index