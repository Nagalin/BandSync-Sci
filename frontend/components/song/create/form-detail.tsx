import Button from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import React, { useState, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { View, StatusBar, FlatList, TouchableOpacity, Text, Keyboard } from 'react-native';
import { TextInput as RnTextInput } from 'react-native-paper';
import useSong from '../use-song-form';

const App = () => {
    const {
        control,
        setValue,
        onSubmit
    } = useSong()
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
            setValue('key', item)
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
                    name='key'
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            label={'key'}
                            onChangeText={onChange}
                            editable={false}
                            value={value}
                            right={<RnTextInput.Icon onPress={openPicker} icon="chevron-down" size={20} />}
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
                name='songRef'
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
                name='additionalDetails'
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
                        name='singerCount'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                keyboardType='numeric'
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
                        name='guitarCount'
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
                        name='drumCount'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวนกลอง' />

                        )}
                    />

                    <Controller
                        control={control}
                        name='guitarCount'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput  value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวนคีย์บอร์ด' />

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
                        name='drumCount'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput  value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวน extra' />

                        )}
                    />

                    <Controller
                        control={control}
                        name='percussionCount'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput  value={value} onChangeText={onChange} keyboardType='numeric' style={{ width: 150 }} label='จำนวน percussion' />

                        )}
                    />
                </View>
            </View>


            <Button onPress={onSubmit}>
                ถัดไป
            </Button>


        </View>
    );
};

export default App;