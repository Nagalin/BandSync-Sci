import axios from '@/libs/axios'
import { Song } from './song'

export type Event = {
    eventId: string
    eventName: string
    eventDate: Date
    startTime: Date
    endTime: Date
    dressCode: string
    additionalDetails: string
}

type EventList = Omit<Event, 'dresscode' | 'additionalDetails'>

export const getEventListService = async () => {
    const response = await axios.get<EventList[]>('/events')
    return response.data 
}

export const getEventInfoService = async (eventId: string) => {
    const response = await axios.get<Event>(`/events/${eventId}`)
    return response.data 
}

export const createEventService = async (data: Omit<Event, 'eventId'>) => {
    return await axios.post('/events', data)
}

export const updateEventService = async (data: Omit<Event, 'eventId'>, eventId: string) => {
    return await axios.put(`/events/${eventId}`, data)
}

export const deleteEventService = async (eventId: string) => {
    return await axios.delete(`/events/${eventId}`)
}

export const startEventService = async (eventId: string) => {
    await axios.post(`/events/${eventId}/start`)
}

export const getCurrentSongService = async (eventId: string) => {
    const response = await axios.get<Pick<Song, 'songId'>>(`/events/${eventId}/current-song`)
    return response.data 
}

export const updateCurrentSongService = async (eventId: string) => {
    return await axios.put(`/events/${eventId}/current-song`)
}
