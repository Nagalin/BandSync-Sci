import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { notificationService } from '@/services/song.service.'
import { useEventDataStore } from '@/zustand/store'
import { Alert } from 'react-native'

type FormType = {
    notiMessage: string
}

const useNoti = (isLastSong: boolean) => {

    const { eventId, songId } = useEventDataStore()
    const showModal = () => {
        if (isLastSong) return Alert.alert('คำเตือน', 'ไม่สามารถแจ้งเตือนในเพลงถัดไปได้เนื่องจากเพลงนี้เป็นเพลงสุดท้ายแล้ว')

        setOpenModal(true)
    }

    const closeModal = () => setOpenModal(false)


    const { control, handleSubmit } = useForm<FormType>()
    const [openModal, setOpenModal] = useState(false)
    const sendNoti = handleSubmit(async (data) => {
        if (isLastSong) return Alert.alert('คำเตือน', 'ไม่สามารถไปเพลงถัดไปได้เนื่องจากเพลงนี้เป็นเพลงสุดท้ายแล้ว')

        await notificationService(eventId, songId, data.notiMessage)
        Alert.alert('สำเร็จ', 'แจ้งเตือนสำเร็จ')
        closeModal()
    })
    const confirmCloseModal = () => {
        Alert.alert('คำเตือน', 'คุณต้องการยกเลิกการสร้าง event หรือไม่', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => setOpenModal(false) },
        ])
    }

    return {
        showModal,
        openModal,
        confirmCloseModal,
        control,
        sendNoti
    }

}

export default useNoti