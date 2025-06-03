import axios from "@/libs/axios"
import { SongType, SongListType } from "@/types/song"


export const getSongListService = async (eventId: string) => {
    const response = await axios.get<SongListType[]>(`/events/${eventId}/songs`)
    return response.data 
}

export const getSongService = async (songId: string, eventId: string) => {
    const response = await axios.get<SongType>(`/events/${eventId}/songs/${songId}`)
    return response.data 
}

export const createSongService = async (song: Omit<SongType, 'songId'>, eventId: string) => {
    return await axios.post(`/events/${eventId}/songs`, song)
}

export const updateSongService = async (song: Omit<SongType, 'songId'>, songId: string, eventId: string) => {
    return await axios.put(`/events/${eventId}/songs/${songId}`, song)
}

export const deleteSongService = async (songId: string, eventId: string) => {
    return await axios.delete(`/events/${eventId}/songs/${songId}`)
}

export const notificationService = async (eventId: string, songId: string, notiMessage: string) => {
    return await axios.post(`/events/${eventId}/songs/${songId}/notification`, {
        notiMessage: notiMessage
    })
}
