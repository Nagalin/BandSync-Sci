import { Alert, Keyboard } from 'react-native'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { createSongService, deleteSongService, updateSongService } from '@/services/song.service.'
import { useEventDataStore } from '@/zustand/store'
import { useCallback, useState } from 'react'
import { SongType } from '@/types/song'

type SongForm = Omit<SongType, 'songId'>

const useSong = (song?: SongType) => {
    const [showSongkeyPicker, setShowSongkeyPicker] = useState(false)
    const openSongKeyPicker = useCallback(
        () => {
            Keyboard.dismiss()
            setShowSongkeyPicker(true)
        },
        [showSongkeyPicker]
    )

    const hideSongKeyPicker = useCallback(
        (item: any) => {
            setShowSongkeyPicker(false)
            setValue('songKey', item)
        },
        [showSongkeyPicker]
    )
    const queryClient = useQueryClient()
    const { eventId } = useEventDataStore()
    const router = useRouter()
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting, errors }
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

    const createSong = handleSubmit(async data => {

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
    )


    const updateSong = handleSubmit(async data => {



        try {
            await updateSongService(data, song?.songId as string, eventId as string)
            Alert.alert('สำเร็จ', 'อัปเดตเพลงสำเร็จ', [
                { text: 'OK' },
            ])
            queryClient.invalidateQueries({ queryKey: ['songs'] })
        } catch (error: any) {
            console.error(error.response?.data?.message)
        }


    })

    const deleteSong = handleSubmit(async data => {


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
    })




    return {
        control,
        setValue,
        watch,
        errors,
        createSong,
        updateSong,
        deleteSong,
        showSongkeyPicker,
        openSongKeyPicker,
        hideSongKeyPicker,
        isSubmitting

    }
}

export default useSong