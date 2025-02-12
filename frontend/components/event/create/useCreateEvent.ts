import axios from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Alert } from "react-native"

type FormValues = {
    eventName: string
    eventDate: Date | undefined
    startTime: Date | undefined
    endTime: Date | undefined
    dressCode: string
    // additionalDetails: string
}

const useCreateEvent = () => {
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            eventName: '',
            eventDate: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            dressCode: '',
            // additionalDetails: '',
        },
    })

    const { mutate: createEvent} = useMutation({
        mutationFn: async (data: FormValues) => {
            console.log('Form Data:', data)
            try {
                const res = await axios.post('/events', data)
                Alert.alert('สำเร็จ', 'สร้าง Event สำเร็จ', [
    
                    { text: 'OK', },
                ])
    
            } catch (error: any) {
                console.error(error.response?.data?.message)
    
            }
    

        }
    })

    const onSubmit = handleSubmit(data => createEvent(data))

    return {
        control,
        handleSubmit,
        setValue,
        watch,
        errors,
        onSubmit
    }

}

export default useCreateEvent