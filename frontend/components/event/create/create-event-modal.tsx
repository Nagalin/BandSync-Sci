import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import CreateEventForm from '@/components/event/create/create-event-form';

const CreateEventModal = () => {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

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
                    <CreateEventForm hideModal={hideModal} />
                </Modal>
            </Portal>

            <Button
                style={{
                    flex: 1,
                    position: 'absolute',
                    bottom: 10,
                    right: 5,
                    alignItems: 'center',
                    backgroundColor: 'red',
                    borderRadius: 30,
                    height: 60,
                    width: 40,
                }}
                onPress={showModal}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#000000',
                        height: '100%',
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: '#ffffff',
                        }}>
                        +
                    </Text>
                </View>
            </Button>
        </React.Fragment>
    )
}

export default CreateEventModal;