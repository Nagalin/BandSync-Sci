import Button from '@/components/ui/button'
import TextInput from '@/components/ui/text-input'
import React, { useState, useCallback } from 'react'
import { View, TouchableOpacity, Text, Keyboard } from 'react-native'
import { TextInput as RnTextInput } from 'react-native-paper'
import useSong from './use-song-form'
import { checkBackstageRole } from '@/utils/check-user-role'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Controller from '../ui/form-controller'
import TotalPlayerInput from './total-player-input'

type FormPropsType = {
    song?: {
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
}

const Form = ({ song }: FormPropsType) => {
    const isCreateMode = !!!song
    const isBackstage = checkBackstageRole()
    const { eventId, songId } = useLocalSearchParams()
    const isUserBackstage = checkBackstageRole()
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter();
    const {
        control,
        setValue,
        errors,
        onSubmit,
        deleteSong
    } = useSong(song)
    const [show, setShow] = useState(false)
    const openPicker = useCallback(
        () => {
            Keyboard.dismiss()
            setShow(true)
        },
        [show]
    )

    const hidePicker = useCallback(
        (item: any) => {
            setShow(false)
            setValue('songKey', item)
        },
        [show]
    )

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView >
                <View style={{ gap: 20, padding: 20 }}>

                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'space-between' }}>
                        <Controller
                            label='ชื่อเพลง'
                            control={control}
                            name='songName'
                            rules={{ required: 'กรุณากรอกชื่อเพลง' }}
                            style={{
                                minWidth: 170
                            }}

                        />

                        <Controller
                            control={control}
                            name='songKey'
                            rules={{ required: 'กรุณากรอก key เพลง' }}
                            render={({ field: { onBlur, onChange, value } }) => (
                                <View>
                                    <TextInput
                                        label={'key'}
                                        onChangeText={onChange}
                                        editable={false}
                                        value={value}
                                        style={{
                                            width: 180
                                        }}
                                        right={<RnTextInput.Icon onPress={openPicker} icon='chevron-down' size={20}
                                        />
                                        }
                                    />

                                    {errors.songKey && (
                                        <Text
                                            style={{
                                                color: 'red',
                                                fontSize: 12,
                                                marginTop: 10,
                                            }}
                                        >
                                            {errors.songKey.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />

                        {show ? (
                            <View style={{
                                backgroundColor: 'rgb(211, 211, 211)',
                                elevation: 1,
                                zIndex: 22,
                                width: '100%',
                                marginTop: 60,
                                position: 'absolute'
                            }}>
                                {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() => hidePicker(item)}>
                                        <Text style={{ padding: 8 }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : null}

                    </View>

                    <View>
                        <Controller
                            label='ref เพลง'
                            control={control}
                            name='songReference'
                            rules={{ required: 'กรุณากรอก ref เพลง' }}

                        />
                    </View>

                    <View>
                        <Controller
                            label='รายละเอียดเพิ่มเติม (optional)'
                            control={control}
                            name='songDescription'
                        />
                    </View>

                    <TotalPlayerInput
                        isCreateMode={isCreateMode}
                        control={control}
                        name='totalVocalist'
                        label='จำนวนนักร้อง'
                        rules={{ required: 'กรุณากรอกจำนวนนักร้อง' }}
                        playerType='vocalist'
                    />

                    <TotalPlayerInput
                        isCreateMode={isCreateMode}
                        control={control}
                        name='totalGuitarist'
                        label='จำนวนกีตาร์'
                        rules={{ required: 'กรุณากรอกจำนวนกีตาร์' }}
                        playerType='guitarist'
                    />

                    <TotalPlayerInput
                        isCreateMode={isCreateMode}
                        control={control}
                        name='totalBassist'
                        label='จำนวนเบส'
                        rules={{ required: 'กรุณากรอกจำนวนเบส' }}
                        playerType='bassist'
                    />

                    <TotalPlayerInput
                        isCreateMode={isCreateMode}
                        control={control}
                        name='totalDrummer'
                        label='จำนวนกลอง'
                        rules={{ required: 'กรุณากรอกจำนวนกลอง' }}
                        playerType='drummer'
                    />

                    <TotalPlayerInput
                        isCreateMode={isCreateMode}
                        control={control}
                        name='totalKeyboardist'
                        label='จำนวนคีย์บอร์ด'
                        rules={{ required: 'กรุณากรอกจำนวนคีย์บอร์ด' }}
                        playerType='keyboardist'
                    />

                    <TotalPlayerInput
                        isCreateMode={isCreateMode}
                        control={control}
                        name='totalExtra'
                        label='จำนวน extra'
                        rules={{ required: 'กรุณากรอกจำนวน extra' }}
                        playerType='extra'
                    />

                    <TotalPlayerInput
                        isCreateMode={isCreateMode}
                        control={control}
                        name='totalPercussionist'
                        label='จำนวน percussion'
                        rules={{ required: 'กรุณากรอกจำนวน percussion' }}
                        playerType='percussionist'
                    />


                    <Button onPress={onSubmit}>
                        {song && isBackstage ? 'แก้ไขเพลง' : 'สร้างเพลง'}
                    </Button>

                    {song && isBackstage ? (

                        <Button variant='danger' onPress={() => deleteSong()}>
                            ลบเพลง
                        </Button>

                    ) : null}

                </View>

            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default Form