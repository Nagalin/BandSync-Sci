import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { createEventService, deleteEventService, Event, updateEventService } from '@/services/event'

type EventForm = Omit<Event, 'eventId'>

const useCreateEvent = (closeModalImmediately?: () => void, event?: Event) => {
    const queryClient = useQueryClient()
    const {
        control,
        handleSubmit,
        setValue,
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

    const { mutate: createEvent } = useMutation({
        mutationFn: async (data: EventForm) => {
            try {
                await createEventService(data)
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
        mutationFn: async (data: EventForm) => {
            try {
                await updateEventService(data, event?.eventId as string)
                Alert.alert('สำเร็จ', 'อัปเดต Event สำเร็จ', [
                    { text: 'OK' },
                ])
                queryClient.invalidateQueries({ queryKey: ['events'] })
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
                            await deleteEventService(event?.eventId as string)
                            Alert.alert('สำเร็จ', 'ลบ Event สำเร็จ')
                            queryClient.invalidateQueries({ queryKey: ['events'] })
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
        onSubmit,
        deleteEvent
    }
}

export default useCreateEvent