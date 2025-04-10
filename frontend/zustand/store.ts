import { create } from 'zustand'

type EventDataStore = {
    eventId: string
    setEventId: (eventId: string) => void
    songId: string
    setSongId: (songId: string) => void
    playerType: string
    setPlayerType: (playerType: string) => void
}

export const useEventDataStore = create<EventDataStore>(set => ({
    eventId: '',
    songId: '',
    playerType: '',
    setEventId: (eventId: string) => set({ eventId }),
    setSongId: (songId: string) => set({ songId }),
    setPlayerType: (playerType: string) => set({ playerType }),
}))