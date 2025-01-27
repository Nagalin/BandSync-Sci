import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { Provider as PaperProvider, Card, Title, Paragraph, Button } from 'react-native-paper';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import SwipeableItem, {
  useSwipeableItemParams,
  OpenDirection,
} from 'react-native-swipeable-item';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const OVERSWIPE_DIST = 20;
const NUM_ITEMS = 20;

type Item = {
  key: string;
  order: number;
  songName: string;
};

const initialData: Item[] = [...Array(NUM_ITEMS)].map((_, index) => ({
  key: `song-${index}`,
  order: index + 1,
  songName: `Song ${index + 1}`,
}));

function App() {
  const [data, setData] = useState(initialData);
  const itemRefs = useRef(new Map());

  const renderItem = useCallback((params: RenderItemParams<Item>) => {
    const onPressDelete = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setData((prev) => {
        return prev.filter((item) => item !== params.item);
      });
    };

    return (
      <RowItem {...params} itemRefs={itemRefs} onPressDelete={onPressDelete} />
    );
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <DraggableFlatList
          keyExtractor={(item) => item.key}
          data={data}
          renderItem={renderItem}
          onDragEnd={({ data }) => setData(data)}
          activationDistance={20}
        />
      </View>
    </PaperProvider>
  );
}

export default App;

type RowItemProps = {
  item: Item;
  drag: () => void;
  onPressDelete: () => void;
  itemRefs: React.MutableRefObject<Map<any, any>>;
};

function RowItem({ item, itemRefs, drag, onPressDelete }: RowItemProps) {
  return (
    <SwipeableItem
      key={item.key}
      item={item}
      ref={(ref) => {
        if (ref && !itemRefs.current.get(item.key)) {
          itemRefs.current.set(item.key, ref);
        }
      }}
      onChange={({ openDirection }) => {
        if (openDirection !== OpenDirection.NONE) {
          // Close all other open items
          [...itemRefs.current.entries()].forEach(([key, ref]) => {
            if (key !== item.key && ref) ref.close();
          });
        }
      }}
      overSwipe={OVERSWIPE_DIST}
      renderUnderlayLeft={() => (
        <UnderlayLeft drag={drag} onPressDelete={onPressDelete} />
      )}
      renderUnderlayRight={() => <UnderlayRight />}
      snapPointsLeft={[150]}
      snapPointsRight={[150]}>
      <Card style={styles.card} onLongPress={drag}>
        <Card.Content>
          <Title>{`${item.order}. ${item.songName}`}</Title>
        </Card.Content>
      </Card>
    </SwipeableItem>
  );
}

const UnderlayLeft = ({
  drag,
  onPressDelete,
}: {
  drag: () => void;
  onPressDelete: () => void;
}) => {
  const { item, percentOpen } = useSwipeableItemParams<Item>();
  const animStyle = useAnimatedStyle(
    () => ({
      opacity: percentOpen.value,
    }),
    [percentOpen]
  );

  return (
    <Animated.View style={[styles.underlayLeft, animStyle]}>
      <Button icon="delete" onPress={onPressDelete} color="white">
        Delete
      </Button>
    </Animated.View>
  );
};

function UnderlayRight() {
  const { close } = useSwipeableItemParams<Item>();
  return (
    <Animated.View style={styles.underlayRight}>
      <Button icon="close" onPress={() => close()} color="white">
        Close
      </Button>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 4,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: 'teal',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: 'tomato',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});