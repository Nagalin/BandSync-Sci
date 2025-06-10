import axios from '@/libs/axios'
import { EventType, EventListType } from '@/types/event'
import { SongType } from '@/types/song'

export const getEventListService = async () => {
    const response = await axios.get<EventListType[]>('/events')
    return response.data 
}

export const getEventInfoService = async (eventId: string) => {
    const response = await axios.get<EventType>(`/events/${eventId}`)
    return response.data 
}

export const createEventService = async (data: Omit<EventType, 'status' | 'eventId'>) => {
    return await axios.post('/events', data)
}

export const updateEventService = async (data: Omit<EventType, 'status' | 'eventId'>, eventId: string) => {
    return await axios.put(`/events/${eventId}`, data)
}

export const deleteEventService = async (eventId: string) => {
    return await axios.delete(`/events/${eventId}`)
}

export const startEventService = async (eventId: string) => {
    await axios.patch(`/events/${eventId}/start`)
}

export const getCurrentSongService = async (eventId: string) => {
    const response = await axios.get<Pick<SongType, 'songId'| 'songName'>>(`/events/${eventId}/current-song`)
    return response.data 
}

export const updateCurrentSongService = async (eventId: string) => {
    return await axios.put(`/events/${eventId}/current-song`)
}

export const endEventService = async (eventId: string) => {
    await axios.patch(`/events/${eventId}/end`)
}
