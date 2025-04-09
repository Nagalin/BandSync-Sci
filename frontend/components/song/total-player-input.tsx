import { View, Text } from 'react-native'
import React from 'react'
import FormController from '../ui/form-controller'
import Button from '../ui/button'
import { Control, FieldValues, Path } from 'react-hook-form'
import { checkBackstageRole } from '@/utils/check-user-role'
import { useLocalSearchParams, useRouter } from 'expo-router'

type TotalPlayerInputPropsType<T extends FieldValues> = {
  label: string
  name: Path<T>
  control: Control<T>
  isCreateMode: boolean
  playerType: string
  rules: any
}

const TotalPlayerInput = <T extends FieldValues>({
  label, rules, control, name, isCreateMode, playerType
}: TotalPlayerInputPropsType<T>) => {
  const isBackstage = checkBackstageRole()
  const router = useRouter()
  const {
    eventId,
    songId
  } = useLocalSearchParams()

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <FormController
        label={label}
        keyboardType='numeric'
        rules={rules}
        editable={isBackstage}
        style={{ minWidth: 170 }}
        control={control}
        name={name}
        defaultValue={0}
      />
      {isCreateMode ? null :
        <Button onPress={() => router.push(`/event/${eventId}/song/${songId}/${playerType}`)}>
          ดูข้อมูล
        </Button>}

    </View>
  )
}

export default TotalPlayerInput