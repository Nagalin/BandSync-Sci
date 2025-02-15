import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { router } from 'expo-router'

type FormValues = {
    eventName: string
    eventId: string
    eventDate: Date | undefined
    startTime: Date | undefined
    endTime: Date | undefined
    dressCode: string
    // additionalDetails: string
}

const useCreateEvent = (closeModalImmediately?: () => void, event?: FormValues) => {
    const queryClient = useQueryClient()
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            eventName: event?.eventName || '',
            eventDate: event?.eventDate || new Date(),
            startTime: event?.startTime || new Date(),
            endTime: event?.endTime || new Date(),
            dressCode: event?.dressCode || '',
            // additionalDetails: event?.additionalDetails || '',
        },
    })

    const { mutate: createEvent } = useMutation({
        mutationFn: async (data: FormValues) => {
            try {
                await axios.post('/events', data)
                Alert.alert('สำเร็จ', 'สร้าง Event สำเร็จ', [
                    { text: 'OK', onPress: closeModalImmediately },
                ])
                queryClient.invalidateQueries({ queryKey: ['events'] })

            } catch (error: any) {
                console.error(error.response?.data?.message)
            }
        }
    })

    const { mutate: updateEvent } = useMutation({
        mutationFn: async (data: FormValues) => {
            try {
                await axios.put(`/events/${event?.eventId}`, data)
                Alert.alert('สำเร็จ', 'อัปเดต Event สำเร็จ', [
                    { text: 'OK' },
                ])
            } catch (error: any) {
                console.error(error.response?.data?.message)
            }
        }
    })

    const { mutate: deleteEvent } = useMutation({
        mutationFn: async () => {
            try {
                Alert.alert('คำเตือน', 'ต้องการลบ Event หรือไม่', [
                    { text: 'cancel' },
                    {
                        text: 'ok', onPress: async () => {
                            await axios.delete(`/events/${event?.eventId}`)
                            Alert.alert('สำเร็จ', 'ลบ Event สำเร็จ')
                            router.navigate('/event');
                        },
                    }
                ])
            } catch (error: any) {
                console.error(error.response?.data?.message)
            }
        }
    })

    const onSubmit = handleSubmit(data => {
        if (event) {
            updateEvent(data)
        } else {
            createEvent(data)
        }
    })

    return {
        control,
        setValue,
        watch,
        errors,
        onSubmit,
        deleteEvent
    }
}

export default useCreateEvent