import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { createEventService, deleteEventService, updateEventService } from '@/services/event.service'
import { AxiosError } from 'axios'
import { EventType } from '@/types/event'

type EventForm = Omit<EventType, 'eventId' | 'status'>

const useEventForm = (closeModalImmediately?: () => void, event?: Omit<EventType, 'status'>) => {
    const queryClient = useQueryClient()
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        watch,
    } = useForm<EventForm>({
        defaultValues: {
            eventName: event?.eventName || '',
            eventDate: event?.eventDate || new Date(),
            startTime: event?.startTime || new Date(),
            endTime: event?.endTime || new Date(),
            dressCode: event?.dressCode || '',
            additionalDetails: event?.additionalDetails || ''
        }
    })

    const createEventMutation = useMutation({
        mutationFn: async (data: EventForm) => {
            await createEventService(data)
        },

        onSuccess: () => {
            Alert.alert('สำเร็จ', 'สร้าง Event สำเร็จ', [
                { text: 'OK', onPress: closeModalImmediately },
            ])
            queryClient.invalidateQueries({ queryKey: ['events'] })
        },

        onError: (error) => {
            if (error instanceof AxiosError && error.response?.status === 409) {
                setError('eventName', {
                    type: 'manual',
                    message: 'ชื่อ Event นี้มีอยู่แล้ว'
                })
            }

            console.error(error)
        }
    })

    const createEvent = handleSubmit(data => {
        createEventMutation.mutate(data)
    })

    const updateEventMutation = useMutation({
        mutationFn: async (data: EventForm) => {
            await updateEventService(data, event?.eventId as string)

            queryClient.invalidateQueries({ queryKey: ['events'] })
        },

        onSuccess: () => {
            Alert.alert('สำเร็จ', 'อัปเดต Event สำเร็จ', [
                { text: 'OK' },
            ])

        },

        onError: (error) => {
            console.error(error)
        }
    })

    const updateEvent = handleSubmit(data => {
        updateEventMutation.mutate(data)
    })

    const deleteEventMutation = useMutation({
        mutationFn: async () => {
            await deleteEventService(event?.eventId as string)


        },

        onSuccess: () => {
            Alert.alert('สำเร็จ', 'ลบ Event สำเร็จ')
            queryClient.invalidateQueries({ queryKey: ['events'] })
            router.back()

        },

        onError: (error) => {
            if (error instanceof AxiosError)
                console.error(error.response?.data?.message)


        }
    })

    const deleteEvent = () => {
        Alert.alert('คำเตือน', 'ต้องการลบ Event หรือไม่', [
            { text: 'cancel' },
            {
                text: 'ok', onPress: async () => {
                    deleteEventMutation.mutate()
                }
            }
        ])

    }


    return {
        control,
        setValue,
        watch,
        createEvent,
        updateEvent,
        deleteEvent
    }
}

export default useEventForm