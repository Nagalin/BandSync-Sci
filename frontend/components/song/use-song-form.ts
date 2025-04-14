import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { createSongService, deleteSongService, Song, updateSongService } from '@/services/song'
import { useEventDataStore } from '@/zustand/store'

type SongForm = Omit<Song, 'songId'>

const useSong = (song?: Song) => {
    const queryClient = useQueryClient()
    const { eventId } = useEventDataStore()
    const router = useRouter()
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<SongForm>({
        defaultValues: {
            songName: song?.songName || '',
            songKey: song?.songKey || 'C',
            songReference: song?.songReference || '',
            songDescription: song?.songDescription || '',
            totalVocalist: song?.totalVocalist || '0',
            totalGuitarist: song?.totalGuitarist || '0',
            totalBassist: song?.totalBassist || '0',
            totalDrummer: song?.totalDrummer || '0',
            totalKeyboardist: song?.totalKeyboardist || '0',
            totalExtra: song?.totalExtra || '0',
            totalPercussionist: song?.totalPercussionist || '0',
        }
    })

    const { mutate: createSong } = useMutation({
        mutationFn: async (data: SongForm) => {
            try {
                await createSongService(data, eventId as string)
                Alert.alert('สำเร็จ', 'สร้างเพลงสำเร็จ', [
                    { text: 'OK' },
                ])
                router.back()
                queryClient.invalidateQueries({ queryKey: ['songs'] })

            } catch (error: any) {
                console.error(error.response?.data?.message)
            }
        }
    })

    const { mutate: updateSong } = useMutation({

        mutationFn: async (data: SongForm ) => {
            try {
                await updateSongService(data, song?.songId as string, eventId as string)
                Alert.alert('สำเร็จ', 'อัปเดตเพลงสำเร็จ', [
                    { text: 'OK' },
                ])
                queryClient.invalidateQueries({queryKey: ['songs']})
            } catch (error: any) {
                console.error(error.response?.data?.message)
            }
        }
    })

    const { mutate: deleteSong } = useMutation({
        mutationFn: async () => {
            try {
                Alert.alert('คำเตือน', 'ต้องการลบเพลงหรือไม่', [
                    { text: 'cancel' },
                    {
                        text: 'ok', onPress: async () => {
                            await deleteSongService(song?.songId as string, eventId as string)
                            queryClient.invalidateQueries({ queryKey: ['songs'] })
                            Alert.alert('สำเร็จ', 'ลบเพลงสำเร็จ')
                            router.back()
                        }
                    }
                ])
            } catch (error: any) {
                console.error(error.response?.data?.message)
            }
        }
    })

    const onSubmit = handleSubmit(data => {
        if (song) {
            updateSong(data)
        } else {
            createSong(data)
        }
    })

    return {
        control,
        setValue,
        watch,
        errors,
        onSubmit,
        deleteSong
    }
}

export default useSong