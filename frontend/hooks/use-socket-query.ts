import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { Alert } from 'react-native'
import { useRouter } from 'expo-router'

let socket: Socket | null = null
const URL = process.env.EXPO_PUBLIC_API_BASE_URL

const getSocket = () => {
  if (!socket) {
    socket = io(URL)
  }
  return socket
}

export const emitSocketEvent = () => {
  const socketInstance = getSocket()
  socketInstance.emit('run-event')
}

export const emitEndEvent = () => {
  const socketInstance = getSocket()
  socketInstance.emit('end-event')
}

export function useSocketQuery() {
  const queryClient = useQueryClient()
  const socketInstance = getSocket()
  const router = useRouter()
  useEffect(() => {
    const listener = () => {
      queryClient.invalidateQueries({ queryKey: ['currentSong'] })
    }

    const endEventListener = () => {
      Alert.alert('ประกาศ', 'Event ได้สิ้นสุดลงแล้ว')
      router.replace('/event')
    }

    socketInstance.on('run-event', listener)
    socketInstance.on('end-event', endEventListener)

    return () => {
      socketInstance.off('run-event', listener)
      socketInstance.off('end-event', endEventListener)

    }
  }, [])
} 