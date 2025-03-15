import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'
import useAxiosWithAuth from '@/hooks/use-axios-with-auth'

type FormValues = {
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

const useSong = (song?: FormValues) => {
    const axios = useAxiosWithAuth()
    const queryClient = useQueryClient()
    const { eventId } = useLocalSearchParams()
    const router = useRouter()
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
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
        mutationFn: async (data: FormValues) => {
            try {
                await axios.post(`/events/${eventId}/songs`, data)

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

        mutationFn: async (data: FormValues) => {
            try {
                await axios.post(`/events/${eventId}/songs`, data)
                Alert.alert('สำเร็จ', 'อัปเดตเพลงสำเร็จ', [
                    { text: 'OK' },
                ])
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
                            await axios.delete(`/events/${eventId}/songs/${song?.songId}`)
                            Alert.alert('สำเร็จ', 'ลบเพลงสำเร็จ')
                            router.replace(`/event/${eventId}/song`)
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