import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { getEventInfoService } from '@/services/event.service'
import { useQuery } from '@tanstack/react-query'
import { useEventDataStore } from '@/zustand/store'

const formatDate = (date: Date) =>
    date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    })

const formatTime = (date: Date) =>
    date.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })



const Header = () => {
  const { eventId } = useEventDataStore()

    const { data: event } = useQuery({
        queryKey: ['event-detail', eventId],
        queryFn: () => getEventInfoService(eventId),
        enabled: !!eventId,
      })
    const eventDate = event?.eventDate ? new Date(event.eventDate) : undefined
    const startTime = event?.startTime ? new Date(event.startTime) : undefined
    const endTime = event?.endTime ? new Date(event.endTime) : undefined
    return (
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
            <Text style={{ fontSize: 14, color: '#777' }}>รายการเพลงทั้งหมด</Text>

            {event && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 }}>
                    <MaterialIcons name="event" size={24} color="#4CAF50" />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                            {event.eventName}
                        </Text>
                        <Text style={{ fontSize: 14, color: '#555' }}>
                            {eventDate ? formatDate(eventDate) : '-'} |{' '}
                            {startTime ? formatTime(startTime) : '-'} -{' '}
                            {endTime ? formatTime(endTime) : '-'}
                        </Text>
                    </View>
                </View>
            )}

            <View style={{ height: 1, backgroundColor: '#eee', marginTop: 12 }} />
        </View>
    )
}

export default Header