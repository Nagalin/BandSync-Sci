import Button from '@/components/ui/button'
import TextInput from '@/components/ui/text-input'
import React, { useState, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { View, FlatList, TouchableOpacity, Text, Keyboard } from 'react-native'
import { TextInput as RnTextInput } from 'react-native-paper'
import useSong from './use-song-form'
import { isBackstage } from '@/utils/check-user-role'

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
    const isUserBackstage = isBackstage()
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
        <View style={{
            padding: 20,
            flexDirection: 'column',
            gap: 20
        }}>

            <View style={{
                flexDirection: 'row',
                gap: 10
            }}>

                <Controller
                    control={control}
                    name='songName'
                    rules={{ required: 'กรุณากรอกชื่อเพลง' }}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <View>
                            <TextInput
                                editable={isUserBackstage}
                                label='ชื่อเพลง'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />

                            {errors.songName && (
                                <Text
                                    style={{
                                        color: 'red',
                                        fontSize: 12,
                                        marginTop: 10,
                                    }}
                                >
                                    {errors.songName.message}
                                </Text>
                            )}
                        </View>
                    )}
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

                {show ?
                    <FlatList
                        style={{ backgroundColor: 'rgb(211, 211, 211)', elevation: 1, zIndex: 22, width: '100%', marginTop: 60, position: 'absolute' }}
                        data={['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => hidePicker(item)}>
                                <Text style={{ padding: 8 }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item}
                    />
                    : null}
            </View>

            <Controller
                control={control}
                name='songReference'
                rules={{ required: 'กรุณากรอก ref เพลง' }}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View>
                        <TextInput
                            editable={isUserBackstage}

                            style={{ width: 150 }}
                            label='ref'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />

                        {errors.songReference && (
                            <Text
                                style={{
                                    color: 'red',
                                    fontSize: 12,
                                    marginTop: 10,
                                }}
                            >
                                {errors.songReference.message}
                            </Text>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='songDescription'
                render={({ field: { onBlur, onChange, value } }) => (
                    <View>
                        <TextInput
                            editable={isUserBackstage}

                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            label='รายละเอียดเพิ่มเติม (optional)'
                        />
                    </View>

                )}
            />

            <View>
                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}
                >
                    <Controller
                        control={control}
                        name='totalVocalist'
                        rules={{ required: 'กรุณากรอกจำนวนนักร้อง' }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View>
                                <TextInput
                                    editable={isUserBackstage}

                                    keyboardType='numeric'
                                    label='จำนวนนักร้อง'
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />

                                {errors.totalVocalist && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: 10,
                                        }}
                                    >
                                        {errors.totalVocalist.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name='totalGuitarist'
                        rules={{ required: 'กรุณากรอกจำนวนกีตาร์' }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View>
                                <TextInput
                                    value={value}
                                    editable={isUserBackstage}

                                    onChangeText={onChange}
                                    keyboardType='numeric'
                                    style={{ width: 150 }}
                                    label='จำนวนกีตาร์'
                                />
                                {errors.totalGuitarist && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: 10,
                                        }}
                                    >
                                        {errors.totalGuitarist.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name='totalBassist'
                        rules={{ required: 'กรุณากรอกจำนวนเบส' }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View>
                                <TextInput
                                    value={value}
                                    editable={isUserBackstage}
                                    onChangeText={onChange}
                                    keyboardType='numeric'
                                    style={{ width: 150 }}
                                    label='จำนวนเบส'
                                />
                                {errors.totalBassist && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: 10,
                                        }}
                                    >
                                        {errors.totalBassist.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10
                    }
                    }>
                    <Controller
                        control={control}
                        name='totalDrummer'
                        rules={{ required: 'กรุณากรอกจำนวนกลอง' }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View>
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    editable={isUserBackstage}
                                    keyboardType='numeric'
                                    style={{ width: 150 }}
                                    label='จำนวนกลอง'
                                />
                                {errors.totalDrummer && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: 10,
                                        }}
                                    >
                                        {errors.totalDrummer.message}
                                    </Text>
                                )}
                            </View>

                        )}
                    />

                    <Controller
                        control={control}
                        name='totalKeyboardist'
                        rules={{ required: 'กรุณากรอกจำนวนคีย์บอร์ด' }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View>
                                <TextInput
                                    value={value}
                                    onBlur={onBlur}
                                    editable={isUserBackstage}
                                    onChangeText={onChange}
                                    keyboardType='numeric'
                                    style={{ width: 150 }}
                                    label='จำนวนคีย์บอร์ด'
                                />
                                {errors.totalKeyboardist && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: 10,
                                        }}
                                    >
                                        {errors.totalKeyboardist.message}
                                    </Text>
                                )}
                            </View>

                        )}
                    />
                </View>

                <View style={
                    {
                        flexDirection: 'row',
                        gap: 10
                    }
                }>

                    <Controller
                        control={control}
                        name='totalExtra'
                        rules={{ required: 'กรุณากรอกจำนวน extra' }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View>
                                <TextInput
                                    value={value}
                                    onBlur={onBlur}
                                    editable={isUserBackstage}
                                    onChangeText={onChange}
                                    keyboardType='numeric'
                                    style={{ width: 150 }}
                                    label='จำนวน extra'
                                />
                                {errors.totalExtra && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: 10,
                                        }}
                                    >
                                        {errors.totalExtra.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name='totalPercussionist'
                        rules={{ required: 'กรุณากรอกจำนวน percussion' }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <View>
                                <TextInput
                                    value={value}
                                    editable={isUserBackstage}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    keyboardType='numeric'
                                    style={{ width: 150 }}
                                    label='จำนวน percussion'
                                />
                                {errors.totalPercussionist && (
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            marginTop: 10,
                                        }}
                                    >
                                        {errors.totalPercussionist.message}
                                    </Text>
                                )}
                            </View>

                        )}
                    />
                </View>
            </View>


            <Button onPress={onSubmit} style={{ width: '90%' }}>
                {song ? 'อัปเดต' : 'สร้าง'}
            </Button>

            {song && <Button onPress={() => deleteSong()} variant='danger'>ลบ</Button>}

        </View>
    )
}

export default Form