import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

type APIResponseType = {
  id: string;
  songName: string;
  songKey: string;
};

export default function App() {
  const router = useRouter()
  const { data: songs = [], isFetching } = useQuery<APIResponseType[]>({
    queryKey: ["songs"],
    queryFn: async () => (await axios.get("/songs")).data,
  });

  const renderItem = ({ item }: { item: APIResponseType }) => (
    <View style={styles.rowItem} >
      <Text onPress={() => router.push({
        pathname: '/song/[id]',
        params: {
          id: item.id
        }
      })} style={styles.text}>{`${item.songName} (${item.songKey})`}</Text>
    </View>
  );

  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: "90%", // Makes it more visually appealing on mobile
    alignSelf: "center", // Centers the item
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue", // Default background color
    borderRadius: 10, // Rounded corners
    padding: 10, // Adds some internal spacing
    marginBottom: 10, // Adds space between each song
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});