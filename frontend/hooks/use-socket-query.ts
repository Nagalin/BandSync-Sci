import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client';

// Create a singleton socket instance
let socket: Socket | null = null;
const URL = process.env.EXPO_PUBLIC_API_BASE_URL
// Function to get the socket instance
const getSocket = () => {
  if (!socket) {
    socket = io(URL);
  }
  return socket;
};

// Export a function to emit events from any component
export const emitSocketEvent = () => {
  const socketInstance = getSocket();
  socketInstance.emit('run-event');
};

export function useSocketQuery() {
  const queryClient = useQueryClient()
  const socketInstance = getSocket();

  useEffect(() => {
    const listener = () => {
      console.log('event received')
      queryClient.invalidateQueries({ queryKey: ['currentSong'] })
    }

    socketInstance.on('run-event', listener)

    return () => {
      socketInstance.off('run-event', listener)
    }
  }, [])
} 