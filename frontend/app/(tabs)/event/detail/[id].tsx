import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { Link } from 'expo-router'
import TextInput from '@/components/ui/text-input'
import Button from '@/components/ui/button'
import Background from '@/components/ui/background'
import ListIcon from '@/assets/icons/list'
import EditIcon from '@/assets/icons/edit'
import Text from '@/components/ui/text'

type FormValues = {
    eventName: string
    eventDate: Date | undefined
    startTime: Date | undefined
    endTime: Date | undefined
    dressCode: string
    additionalDetails: string
}

const Index = () => {
    const formValues: FormValues = {
        eventName: 'Event 1',
        eventDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        dressCode: 'เสื้อเหลือง การเกงดำ',
        additionalDetails: '',
    }

    return (
        <Background style={{
            flexDirection: 'column',
            gap: 20,
            padding: 10,
        }}>
            <Text>(icon edit เฉพาะ backstage)</Text>
            <EditIcon width={40} height={40} style={{ alignSelf: 'flex-end', marginRight: 10, }} />

            {/* Event Name */}
            <TextInput
                disabled
                label="ชื่อ Event"
                value={formValues.eventName}
            />

            {/* Event Date */}
            <TextInput
                disabled
                label="วว/ดด/ปป"
                right={<PaperTextInput.Icon icon="calendar" />}

                value={formValues.eventDate ? formValues.eventDate.toLocaleDateString() : ''}
            />

            {/* Start and End Time */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
                {/* Start Time */}
                <TextInput
                    disabled
                    label="เวลาเริ่มต้น"
                    style={{ width: 140 }}
                    right={<PaperTextInput.Icon icon="timer" />}
                    value={
                        formValues.startTime
                            ? formValues.startTime.toLocaleTimeString('th-TH', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : ''
                    }
                />

                {/* End Time */}
                <TextInput
                    disabled
                    label="เวลาสิ้นสุด"
                    style={{ width: 140 }}
                    right={<PaperTextInput.Icon icon="timer" />}
                    value={
                        formValues.endTime
                            ? formValues.endTime.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : ''
                    }
                />
            </View>

            {/* Dress Code */}
            <TextInput
                disabled
                label="Dresscode"
                value={formValues.dressCode}
            />

            {/* Additional Details */}
            <TextInput
                disabled
                multiline
                label="รายละเอียดเพิ่มเติม"
                style={{ height: 80 }}
                value={formValues.additionalDetails}
            />

            <Link href="/song/queue" asChild>
                <Pressable>
                    <Button >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 10,
                            alignItems: 'center',
                        }}>
                            <ListIcon width={20} height={20} />
                            <Text>
                                ดูรายชื่อเพลง
                            </Text>
                        </View>
                    </Button>
                </Pressable>
            </Link>
            <Button>เริ่ม Event (เฉพาะ backstage)</Button>
        </Background>
    )
}

export default Index