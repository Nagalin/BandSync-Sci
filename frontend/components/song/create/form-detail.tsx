import Button from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import React, { useState, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { View, StatusBar, FlatList, TouchableOpacity, Text, Keyboard } from 'react-native';
import { TextInput as RnTextInput } from 'react-native-paper';
import useSong from '../use-song-form';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

type FormPropsType = {
    song?: {
        id: string,
        songName: string,
        songDescription: string,
        songOrder: string,
        songKey: string,
        songReference: string,
        songVocalist: string,
        songGuitarist: string,
        songDrummer: string,
        songBassist: string,
        songKeyboardist: string,
        songExtra: string,
        songPercussionist: string

    }
}
const Form = ({ song }: FormPropsType) => {
    const {
        control,
        setValue,
        onSubmit,
        deleteSong
    } = useSong(song)
    const [show, setShow] = useState(false);
    const openPicker = useCallback(
        () => {
            Keyboard.dismiss()
            setShow(true)
        },
        [show]
    );

    const hidePicker = useCallback(
        (item: any) => {
            setShow(false)
            setValue('songKey', item)
        },
        [show]
    );

    return (
        <View style={{
            padding: 20,
            flexDirection: 'column',
            // justifyContent: 'center',
            // height: '100%',
            gap: 20
        }}>

            <View style={{
                flexDirection: 'row',
                gap: 10
            }}>

                <Controller
                    control={control}
                    name='songName'
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            // style={{ width: 150 }}
                            label='ชื่อเพลง'
                            // onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='songKey'
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            label={'key'}
                            onChangeText={onChange}
                            editable={false}
                            value={value}
                            right={<RnTextInput.Icon onPress={openPicker} icon='chevron-down' size={20} />}
                        />
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
                render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                        style={{ width: 150 }}
                        label='ref'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Controller
                control={control}
                name='songDescription'
                render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput value={value} onChangeText={onChange} label='รายละเอียดเพิ่มเติม (optional)' />

                )}
            />



            <View>

                <View style={
                    {
                        flexDirection: 'row',
                        gap: 10
                    }
                }>
                    <Controller
                        control={control}
                        name='songVocalist'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                keyboardType='numeric'
                                // style={{ width: 150 }}
                                label='จำนวนนักร้อง'
                                // onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='songGuitarist'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวนกีตาร์' />

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
                        name='songDrummer'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวนกลอง' />

                        )}
                    />

                    <Controller
                        control={control}
                        name='songKeyboardist'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวนคีย์บอร์ด' />

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
                        name='songExtra'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวน extra' />

                        )}
                    />

                    <Controller
                        control={control}
                        name='songPercussionist'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวน percussion' />

                        )}
                    />
                </View>
            </View>


            <Button onPress={onSubmit} style={{ width: '90%' }}>
                    {song ? 'อัปเดต' : 'สร้าง'}
                </Button>

                {song && <Button onPress={() => deleteSong()} variant='danger'>ลบ</Button>}


        </View>
    );
};

export default Form;