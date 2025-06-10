import { View, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Button from '@/components/ui/button'
import {  startEventService } from '@/services/event.service'
import { checkBackstageRole } from '@/utils/check-user-role'
import { isSameDay } from 'date-fns'
import ListIcon from '@/assets/icons/list'
import Text from '@/components/ui/text'
import { EventType } from '@/types/event'

const EventActionButtons = ({ eventId, eventDate, status }: Pick<EventType, 'eventId' | 'eventDate' | 'status'>) => {
    const isBackstage = checkBackstageRole()
    const isEventDay = isSameDay(eventDate!, new Date())
    const router = useRouter()
    const runEvent = async () => {
        if (!isEventDay) return Alert.alert('คำเตือน', 'ไม่สามารถเริ่ม Event ได้เนื่องจากยังไม่ถึงวันกำหนดการ')
        if (status === 'COMPLETED') return Alert.alert('คำเตือน', 'ไม่สามารถเริ่ม Event ได้เนื่องจาก Event นี้ได้จบไปล้ว')

        await startEventService(eventId)
        router.push('/event/run')

    }
    const viewSongQueue = async () => {
        if (status == 'ONGOING') return router.push('/event/run')
        router.push('/song')

    }

    return (
        <View style={{flexDirection: 'column', gap: 20}}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {isBackstage ?
                    (

                        <Button
                            onPress={runEvent}
                            style={{ width: '90%', marginTop: -5 }}
                        >
                            เริ่ม Event
                        </Button>
                    ) : null
                }
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <Button onPress={viewSongQueue} style={{ width: '90%' }}>
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
            </View>
        </View>
    )
}

export default EventActionButtons