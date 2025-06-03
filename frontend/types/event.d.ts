export type EventType = {
    eventId: string
    eventName: string
    eventDate: Date
    startTime: Date
    endTime: Date
    dressCode: string
    additionalDetails: string,
    status:  'UPCOMING' |
    'ONGOING' |
    'COMPLETED' 
}

type EventListType = Omit<EventType, 'dresscode' | 'additionalDetails'>