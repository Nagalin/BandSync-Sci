import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
/*import { GestureHandlerRootView } from 'react-native-gesture-handler'*/
import SongCard from '@/components/song/card'
import Text from '@/components/ui/text'
import Background from '@/components/ui/background'
import { useRouter } from 'expo-router'
import Button from '@/components/ui/button'
import { checkBackstageRole } from '@/utils/check-user-role'
import { getCurrentSongService, updateCurrentSongService } from '@/services/event'
import { useQuery } from '@tanstack/react-query'
import { useEventDataStore } from '@/zustand/store'
import { emitSocketEvent } from '@/hooks/use-socket-query'
import { Modal as RnModal, Portal } from 'react-native-paper'
import CloseButton from '@/assets/icons/close-square'
import { useAppTheme } from '@/hooks/use-theme'
import TextInput from '@/components/ui/text-input'
import { notificationService } from '@/services/song'

function Run() {
  const theme = useAppTheme()
  const {eventId, songId, setSongId} = useEventDataStore()

  const [openModal, setOpenModal] = useState(false)
  const showModal = () => setOpenModal(true)

  const router = useRouter()
  const isUserBackstage = checkBackstageRole()
  const { data: currentSong, isPending, isError } = useQuery({
    queryKey: ['currentSong'],
    queryFn: async () => {
      const song = await getCurrentSongService(eventId)
      setSongId(song.songId)
      return song

    }
  })
  const confirmCloseModal = () => {
    Alert.alert('คำเตือน', 'คุณต้องการยกเลิกการสร้าง event หรือไม่', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        { text: 'OK', onPress: () => setOpenModal(false) }
    ])
}

  if (isError || isPending) return

  console.log(currentSong.songId)

  return (
    <Background>

        <Text style={{ fontSize: 30 }}>งานเปิดบ้าน</Text>
        <SongCard currentSongId={currentSong.songId} />

      {
        isUserBackstage ? (
          <>
            <Button
              style={{
                position: 'absolute',
                bottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                right: 5,
                borderRadius: 30,
                height: 60,
                width: 40,
              }}
              onPress={() => router.navigate('/song/create')}
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>

                <Text style={{
                  lineHeight: 40,
                  width: 40,
                  textAlign: 'center',
                  height: '100%',
                  fontSize: 40
                }}>
                  +
                </Text>
              </View>
            </Button>

            <Button onPress={() => setOpenModal(true)}>
              Notification
            </Button>
          </>

        ) : null
      }

      <Button
        onPress={async () => {
          await updateCurrentSongService(eventId)
          emitSocketEvent()
          // queryClient.invalidateQueries({ queryKey: ['currentSong'] })
        }}
        style={{
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text>Next Song</Text>
      </Button>

      <React.Fragment>
            <Portal>
                <RnModal
                    dismissable={false}
                    visible={openModal}
                    onDismiss={confirmCloseModal}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        margin: 10,
                        height: '80%',
                    }}
                >
                    <CloseButton
                        onPress={confirmCloseModal}
                        style={{ alignSelf: 'flex-end' }}
                        width={60}
                        height={60}
                    />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps='handled'
                        >
                            <TextInput placeholder='ข้อความแจ้งเตือน (optional)'/>
                            <Button onPress={async () => await notificationService(eventId, songId)}> แจ้งเตือน </Button>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </RnModal>
            </Portal>

            {isUserBackstage ?
                (
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
                ) :
                null
            }


        </React.Fragment>




    </Background>
  )
}

export default Run