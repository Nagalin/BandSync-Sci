import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getSongListService, SongList } from '@/services/song';
import { useEventDataStore } from '@/zustand/store';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import axios from '@/libs/axios';
import { checkBackstageRole } from '@/utils/check-user-role';

type CardPropsType = {
  currentSongId?: string;
};

export default function Card({ currentSongId }: CardPropsType) {
  const router = useRouter();
  const { setSongId, eventId } = useEventDataStore();
  const { data: songsData = [], isLoading } = useQuery({
    queryKey: ['songs', eventId],
    queryFn: async () => await getSongListService(eventId)
  });

  const [songs, setSongs] = useState<SongList[]>([]);
  const isUserBackstage = checkBackstageRole();

  useEffect(() => {
    if (songsData.length > 0) {
      setSongs((songsData as (SongList & { songOrder: number })[]).sort((a, b) => a.songOrder - b.songOrder));
    }
  }, [songsData]);

  const updateOrder = async (newData: SongList[]) => {
    try {
      await axios.patch(`/events/${eventId}/songs/reorder`, {
        songOrder: newData.map((song, idx) => ({
          songId: song.songId,
          songOrder: idx,
        })),
      });
    } catch (error) {
      console.error('Error updating song order:', error);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<SongList>) => (
    <Pressable
      onLongPress={isUserBackstage ? drag : undefined}
      disabled={!isUserBackstage}
      style={[
        styles.rowItem,
        item.songId === currentSongId && styles.activeRowItem,
        isActive && { backgroundColor: '#d0e1f9' }
      ]}
    >
      <Text
        onPress={() => {
          setSongId(item.songId);
          router.navigate({ pathname: '/song/detail' });
        }}
        style={styles.text}
      >
        {`${item.songName} (${item.songKey})`}
      </Text>
    </Pressable>
  );

  if (isLoading) {
    return (
      <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    );
  }

  return (
    <DraggableFlatList
      data={songs}
      onDragEnd={({ data }) => {
        setSongs(data);
        if (isUserBackstage) {
          updateOrder(data);
        }
      }}
      keyExtractor={(item) => item.songId.toString()}
      renderItem={renderItem}
      activationDistance={10}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 10,
  },
  activeRowItem: {
    backgroundColor: 'purple',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
