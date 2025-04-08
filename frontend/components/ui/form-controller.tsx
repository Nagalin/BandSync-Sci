import React from 'react'
import {
    Controller,
    Control,
    FieldValues,
    Path
} from 'react-hook-form'
import TextInput from './text-input'
import Text from './text'

type FormControllerProps<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
    label?: string
    rules?: any
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
    defaultValue,
    editable = true,
    render,
}: FormControllerProps<T>) => {
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
                        <TextInput
                            label={label}
                            editable={editable}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
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
                </>
            )}
        />
    )
}

export default FormController 