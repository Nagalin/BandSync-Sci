import React from 'react'
import {
    Controller,
    Control,
    FieldValues,
    Path
} from 'react-hook-form'
import TextInput from './text-input'
import Text from './text'
import { KeyboardTypeOptions, StyleProp, TextStyle, View } from 'react-native'
import { checkBackstageRole } from '@/utils/check-user-role'

type FormControllerProps<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
    label?: string
    rules?: any
    keyboardType?: KeyboardTypeOptions
    style?: StyleProp<TextStyle>
    defaultValue?: any
    editable?: boolean
    render?: (props: {
        field: {
            onChange: (value: any) => void
            onBlur: () => void
            value: any
        }
    }) => React.ReactNode
}

const FormController = <T extends FieldValues>({
    name,
    control,
    label,
    rules,
    style,
    defaultValue,
    keyboardType = 'default',
    editable = true,
    render,
}: FormControllerProps<T>) => {
    const isBackstage = checkBackstageRole()
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                    {render ? (
                        render({ field: { onChange, onBlur, value } })
                    ) : (
                        <View style={{
                            flexDirection: 'column',
                            gap: 20
                        }}>

                            <TextInput
                                keyboardType={keyboardType}
                                style={style}
                                label={label}
                                editable={isBackstage}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            {error && (
                                <Text
                                    style={{
                                        color: 'red',
                                        fontSize: 12,
                                        marginTop: -10,
                                    }}
                                >
                                    {error.message}
                                </Text>
                            )}
                        </View>
                    )}

                </>
            )}
        />
    )
}

export default FormController 