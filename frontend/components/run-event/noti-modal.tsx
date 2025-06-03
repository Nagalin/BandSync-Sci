import React from 'react'
import { Modal as RnModal, Portal } from 'react-native-paper'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import CloseButton from '@/assets/icons/close-square'
import Controller from '@/components/ui/form-controller'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import { checkBackstageRole } from '@/utils/check-user-role'
import useNoti from './use-noti'

type NotiModalPropsType = {
    isLastSong: boolean
    songName: string
}

const NotiModal = ({ isLastSong, songName }: NotiModalPropsType) => {
    const isUserBackstage = checkBackstageRole()
    const {
        showModal,
        openModal,
        confirmCloseModal,
        control,
        sendNoti
    } = useNoti(isLastSong)


    return (
        <View>
            {isUserBackstage && (
                <View style={{ position: 'absolute', bottom: 20, right: 20, gap: 12 }}>
                    <Button

                        style={{
                            backgroundColor: '#FF9800',
                            borderRadius: 30,
                            height: 60,
                            paddingHorizontal: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={showModal}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>🔔 แจ้งเตือน</Text>
                    </Button>
                </View>
            )}
            <Portal>
                <RnModal
                    dismissable={false}
                    visible={openModal}
                    onDismiss={confirmCloseModal}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        margin: 20,
                        padding: 16,
                        borderRadius: 16,
                        height: '60%',
                        justifyContent: 'flex-start',
                    }}
                >
                    <CloseButton
                        onPress={confirmCloseModal}
                        style={{ alignSelf: 'flex-end' }}
                        width={48}
                        height={48}
                    />

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <ScrollView keyboardShouldPersistTaps="handled">
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
                                แจ้งเตือน player เพลงถัดไป (เพลง {songName})
                            </Text>

                            <Controller
                                label='ข้อความแจ้งเตือน (optional)'
                                control={control}
                                name='notiMessage'
                                style={{ minWidth: 170 }}
                            />
                            <Button
                                onPress={sendNoti}
                                style={{ marginTop: 12 }}
                            >
                                ส่งแจ้งเตือน
                            </Button>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </RnModal>
            </Portal>
        </View>

    )
}

export default NotiModal