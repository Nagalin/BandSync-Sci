import Button from '@/components/ui/button'
import TextInput from '@/components/ui/text-input'
import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { TextInput as RnTextInput } from 'react-native-paper'
import useSongForm from '@/components/song/use-song-form'
import { checkBackstageRole } from '@/utils/check-user-role'
import { ScrollView } from 'react-native-gesture-handler'
import * as WebBrowser from 'expo-web-browser'
import Controller from '@/components/ui/form-controller'
import TotalPlayerInput from '@/components/song/total-player-input'
import { SongType } from '@/types/song'

type FormPropsType = {
    song?: SongType
}

const Form = ({ song }: FormPropsType) => {
    const isCreateMode = !!!song
    const isBackstage = checkBackstageRole()
    const {
        control,
        showSongkeyPicker,
        openSongKeyPicker,
        hideSongKeyPicker,
        errors,
        createSong,
        updateSong,
        isSubmitting,
        deleteSong
    } = useSongForm(song)


    return (
        /*<GestureHandlerRootView style={{ flex: 1 }}>*/
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} >
            <View style={{ gap: 20/*, padding: 20*/ }}>

                <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'space-between' }}>
                    <Controller
                        label='ชื่อเพลง'
                        control={control}
                        name='songName'
                        rules={{ required: 'กรุณากรอกชื่อเพลง' }}
                        style={{ minWidth: 170 }}
                    />

                    <Controller
                        control={control}
                        name='songKey'
                        rules={{ required: 'กรุณากรอก key เพลง' }}
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <TextInput
                                    label={'key'}
                                    onChangeText={onChange}
                                    editable={false}
                                    value={value}
                                    style={{ width: 180 }}
                                    right={
                                        <RnTextInput.Icon
                                            onPress={openSongKeyPicker}
                                            icon='chevron-down' size={20}
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

                    {showSongkeyPicker ? (
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
                                    onPress={() => hideSongKeyPicker(item)}>
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
                        render={({ field: { onChange, value } }) => (
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <TextInput
                                    label='ref เพลง'
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ flex: 1 }}
                                />
                                {value && (
                                    <Button
                                        onPress={() => WebBrowser.openBrowserAsync(value)}
                                        style={{ width: 100 }}
                                    >
                                        เปิดลิงก์
                                    </Button>
                                )}
                            </View>
                        )}
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

                {
                    song ? <Button onPress={updateSong}>
                        {isSubmitting ? 'กำลังอัปเดตเพลง...' : 'อัปเดตเพลง'}
                    </Button> :
                        <Button onPress={createSong}>
                            {isSubmitting ? 'กำลังสร้างเพลง...' : 'สร้างเพลง'}
                        </Button>
                }

                {song && isBackstage ? (

                    <Button variant='danger' onPress={() => deleteSong()}>
                        {isSubmitting ? 'กำลังลบเพลง...' : 'ลบเพลง'}

                    </Button>

                ) : null}

            </View>

        </ScrollView>
        /* </GestureHandlerRootView>*/
    )
}

export default Form