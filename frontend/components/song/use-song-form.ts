import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { router } from 'expo-router'

type FormValues = {
    songName: string
    songId: string
    songRef: string
    key: string
    additionalDetails: string
    singerCount: string
    guitarCount: string
    drumCount: string
    keyboardCount: string
    extraCount: string
    percussionCount: string
}

const useSong = (song?: FormValues) => {
    const queryClient = useQueryClient()
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            songName: song?.songName || '',
            songId: song?.songId || '',
            key: song?.key || '',
            additionalDetails: song?.additionalDetails || '',
            singerCount: song?.singerCount || '0',
            guitarCount: song?.singerCount || '0',
            drumCount: song?.singerCount || '0',
            keyboardCount: song?.singerCount || '0',
            extraCount: song?.singerCount || '0',
            percussionCount: song?.singerCount || '0',

        },
    })

    const { mutate: createSong } = useMutation({
        mutationFn: async (data: FormValues) => {
            console.log(data)
            try {
                await axios.post('/songs', {
                    songName: data.songName,
                    songDescription: data.additionalDetails,
                    songKey: data.key,
                    songReference: data.songRef
                })
                Alert.alert('สำเร็จ', 'สร้าง Song สำเร็จ', [
                    { text: 'OK' },
                ])
                queryClient.invalidateQueries({ queryKey: ['songs'] })

            } catch (error: any) {
                console.error(error.response?.data?.message)
            }
        }
    })

    const { mutate: updateSong } = useMutation({
        mutationFn: async (data: FormValues) => {
            try {
                await axios.put(`/songs/${song?.songId}`, data)
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
                Alert.alert('คำเตือน', 'ต้องการลบ Song หรือไม่', [
                    { text: 'cancel' },
                    {
                        text: 'ok', onPress: async () => {
                            await axios.delete(`/songs/${song?.songId}`)
                            Alert.alert('สำเร็จ', 'ลบ Song สำเร็จ')
                            router.navigate('/song')
                        },
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