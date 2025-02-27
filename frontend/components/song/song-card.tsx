import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

type APIResponseType = {
  id: string;
  songName: string;
  songKey: string;
};

export default function App() {
  const { data: songs = [], isFetching } = useQuery<APIResponseType[]>({
    queryKey: ["songs"],
    queryFn: async () => (await axios.get("/songs")).data,
  });

  const renderItem = ({ item, drag, isActive }: RenderItemParams<APIResponseType>) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[styles.rowItem, { backgroundColor: isActive ? "red" : "blue" }]}
      >
        <Text style={styles.text}>{`${item.songName} (${item.songKey})`}</Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <DraggableFlatList
      data={songs}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onDragEnd={() => {console.log('something')}}
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



