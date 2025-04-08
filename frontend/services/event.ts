import axios from "@/libs/axios"

type Event = {
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
    const response = await axios.get('/events')
    return response.data as EventList[]
}

export const getEventInfoService = async (eventId: string) => {
    const response = await axios.get(`/events/${eventId}`)
    console.log("for debug: ",response.data)
    return response.data as Event
}

export const createEventService = async (data: Event) => {
    return await axios.post('/events', data)
}

export const updateEventService = async (data: Event, eventId: string) => {
    return await axios.put(`/events/${eventId}`, data)
}

export const deleteEventService = async (eventId: string) => {
    return await axios.delete(`/events/${eventId}`)
}
