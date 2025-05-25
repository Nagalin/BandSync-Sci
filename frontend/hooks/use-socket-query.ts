import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
const URL = process.env.EXPO_PUBLIC_API_BASE_URL

const getSocket = () => {
  if (!socket) {
    socket = io(URL);
  }
  return socket;
};

export const emitSocketEvent = () => {
  const socketInstance = getSocket();
  socketInstance.emit('run-event');
};

export function useSocketQuery() {
  const queryClient = useQueryClient()
  const socketInstance = getSocket();

  useEffect(() => {
    const listener = () => {
      queryClient.invalidateQueries({ queryKey: ['currentSong'] })
    }

    socketInstance.on('run-event', listener)

    return () => {
      socketInstance.off('run-event', listener)
    }
  }, [])
} 