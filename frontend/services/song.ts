import axios from "@/libs/axios"

export type Song = {
    songId: string,
    songName: string,
    songDescription: string,
    songOrder: string,
    songKey: string,
    songReference: string,
    totalVocalist: string,
    totalGuitarist: string,
    totalDrummer: string,
    totalBassist: string,
    totalKeyboardist: string,
    totalExtra: string,
    totalPercussionist: string
}

export type SongList = Pick<Song, 'songId' | 'songName' | 'songKey'>

export const getSongListService = async (eventId: string) => {
    const response = await axios.get<SongList[]>(`/events/${eventId}/songs`)
    return response.data 
}

export const getSongService = async (songId: string, eventId: string) => {
    const response = await axios.get<Song>(`/events/${eventId}/songs/${songId}`)
    return response.data 
}

export const createSongService = async (song: Omit<Song, 'songId'>, eventId: string) => {
    return await axios.post(`/events/${eventId}/songs`, song)
}

export const updateSongService = async (song: Omit<Song, 'songId'>, songId: string, eventId: string) => {
    return await axios.put(`/events/${eventId}/songs/${songId}`, song)
}

export const deleteSongService = async (songId: string, eventId: string) => {
    return await axios.delete(`/events/${eventId}/songs/${songId}`)
}
