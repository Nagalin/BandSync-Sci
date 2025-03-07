import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useRouter } from 'expo-router'

type FormValues = {
    id: string,
    songName: string,
    songDescription: string,
    songOrder: string,
    songKey: string,
    songReference: string,
    songVocalist: string,
    songGuitarist: string,
    songDrummer: string,
    songBassist: string,
    songKeyboardist: string,
    songExtra: string,
    songPercussionist: string
}

const useSong = (song?: FormValues) => {
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
            songVocalist: song?.songVocalist || '0',
            songGuitarist: song?.songGuitarist || '0',
            songBassist: song?.songBassist || '0',
            songDrummer: song?.songDrummer || '0',
            songKeyboardist: song?.songKeyboardist || '0',
            songExtra: song?.songExtra || '0',
            songPercussionist: song?.songPercussionist || '0',
        }
    })

    const { mutate: createSong } = useMutation({
        mutationFn: async (data: FormValues) => {
            try {
                await axios.post(`/events/${eventId}/songs`, data)

                Alert.alert('สำเร็จ', 'สร้าง Song สำเร็จ', [
                    { text: 'OK' },
                ])
                router.replace(`/event/${eventId}/song`)
                queryClient.invalidateQueries({ queryKey: ['songs'] })

            } catch (error: any) {
                console.error(error.response?.data?.message)
            }
        }
    })

    const { mutate: updateSong } = useMutation({

        mutationFn: async (data: FormValues) => {
            try {
                await axios.put(`/songs/${song?.id}`, data)
                Alert.alert('สำเร็จ', 'อัปเดต Song สำเร็จ', [
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
                            await axios.delete(`/events/${eventId}/songs/${song?.id}`)
                            Alert.alert('สำเร็จ', 'ลบ Song สำเร็จ')
                            router.navigate('/event/[eventId]/songs')
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