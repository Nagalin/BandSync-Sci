import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Modal, Portal, Button } from 'react-native-paper'
import CreateEventForm from '@/components/event/form'
import Text from '@/components/ui/text'
import { useAppTheme } from '@/hooks/use-theme'
import CloseButton from '@/assets/icons/close-square';

const CreateEventModal = () => {
    const theme = useAppTheme()
    const [visible, setVisible] = useState(false)
    const showModal = () => setVisible(true)
    const hideModal = () => {
        Alert.alert('คำเตือน', 'คุณต้องการยกเลิกการสร้าง event หรือไม่', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'OK', onPress: () => setVisible(false) },
        ])
    }
    const closeModal = () => setVisible(false)

    return (
        <React.Fragment>
            <Portal>
                <Modal
                    dismissable={false}
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        margin: 10,
                        height: '80%',
                    }}
                >
                    <CloseButton
                        onPress={hideModal}
                        style={{ alignSelf: 'flex-end' }}
                        width={60}
                        height={130}
                    />
                    <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={{ flex: 1 }}
                            >
                                <ScrollView
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    keyboardShouldPersistTaps="handled">
                    <CreateEventForm closeModal={closeModal}/>
                                </ScrollView>
                                </KeyboardAvoidingView>
                </Modal>
            </Portal>

            <Button
                style={{
                    flex: 1,
                    position: 'absolute',
                    bottom: 10,
                    right: 5,
                    alignItems: 'center',
                    backgroundColor: theme.colors.mainButton,
                    borderRadius: 30,
                    height: 60,
                    width: 40,
                }}
                onPress={showModal}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        height: '100%',
                    }}>
                    <Text
                        style={{
                            fontSize: 40,
                            lineHeight: 40,
                            textAlignVertical: 'center',
                            height: '100%',
                        }}>
                        +
                    </Text>
                </View>
            </Button>
        </React.Fragment>
    )
}

export default CreateEventModal