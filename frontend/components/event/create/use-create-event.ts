import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from '@/lib/axios'

type FormValues = {
    eventName: string
    eventId: string
    eventDate: Date | undefined
    startTime: Date | undefined
    endTime: Date | undefined
    dressCode: string
    // additionalDetails: string
}

const useCreateEvent = ( closeModalImmediately?: () => void, event?: FormValues) => {
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
        onSubmit
    }
}

export default useCreateEvent