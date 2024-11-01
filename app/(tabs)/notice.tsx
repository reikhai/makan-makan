import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swipeable from "react-native-gesture-handler/Swipeable";

const initialNoticeData = Array.from({ length: 20 }, (_, index) => ({
  id: index.toString(),
  title: `Notice ${index + 1}`,
  content: `Notice content Lorem ipsum dolor sit amet ${index + 1}`,
}));

export default function NoticeScreen({ navigation }) {
  const [cardData, setCardData] = useState(initialNoticeData);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = (id) => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.id === id ? { ...card, isFavourite: !card.isFavourite } : card
      )
    );
  };

  const deleteNotice = (id) => {
    setCardData((prevData) => prevData.filter((card) => card.id !== id));
  };

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      const newCards = Array.from({ length: 10 }, (_, index) => ({
        id: (cardData.length + index).toString(),
        title: `Notice ${cardData.length + index + 1}`,
        content: `Notice content Lorem ipsum dolor sit amet ${
          cardData.length + index + 1
        }`,
      }));

      setCardData((prevData) => [...prevData, ...newCards]);
      setLoading(false);
    }, 1500);
  };

  const renderRightActions = (id) => (
    <ThemedView style={styles.swipedRow}>
      <TouchableOpacity onPress={() => deleteNotice(id)}>
        <Ionicons
          name="trash-bin-outline"
          size={20}
          color={"red"}
        />
      </TouchableOpacity>
    </ThemedView>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <ThemedView style={styles.surface}>
          <ThemedView style={styles.noticeContainer}>
            <Ionicons name="mail-outline" size={30} color="black" />
            <ThemedView style={{ width: 270, flexDirection: "column" }}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText type="default" numberOfLines={1} ellipsizeMode="tail">
                {item.content}
                <ThemedText style={styles.date} type="label">
                  12-12-2024
                </ThemedText>
              </ThemedText>
            </ThemedView>
            <ThemedText type="label">
              12-12-2024
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <FlatList
      data={cardData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={1}
      contentContainerStyle={styles.cardContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "space-between",
  },
  surface: {
    margin: 5,
    padding: 8,
    height: 80,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  swipedRow: {
    margin: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 80,
  },
});
