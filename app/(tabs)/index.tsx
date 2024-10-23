import React, { useState } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView"; 
import { ThemedText } from "@/components/ThemedText";
import { Card, Text } from "react-native-paper";

const initialCardData = Array.from({ length: 20 }, (_, index) => ({
  id: index.toString(),
  title: `Card Title ${index + 1}`,
  content: `Card content ${index + 1}`,
  imageUri: `https://picsum.photos/700?random=${index}`, // Unique image for each card
}));

export default function HomeScreen({ navigation }) {
  const [cardData, setCardData] = useState(initialCardData);
  const [loading, setLoading] = useState(false);

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      const newCards = Array.from({ length: 10 }, (_, index) => ({
        id: (cardData.length + index).toString(),
        title: `Card Title ${cardData.length + index + 1}`,
        content: `Card content ${cardData.length + index + 1}`,
        imageUri: `https://picsum.photos/700?random=${cardData.length + index}`, // Unique image
      }));

      setCardData((prevData) => [...prevData, ...newCards]);
      setLoading(false);
    }, 1500);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.imageUri }} />
      <Card.Content>
        <ThemedText>{item.title}</ThemedText>
        <ThemedText>{item.content}</ThemedText>
      </Card.Content>
    </Card>
  );

  return (
    <ThemedView style={styles.titleContainer}>
      <FlatList
        data={cardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display two cards per row
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar
        showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        onEndReached={loadMoreData} // Load more data when scrolled to the end
        onEndReachedThreshold={0.5} // Threshold to trigger loading
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        } // Loader at the bottom
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    padding: 5, // Padding around the entire container
  },
  cardContainer: {
    justifyContent: "space-between", // Space between the cards
  },
  card: {
    flex: 1,
    margin: 8, // Margin for spacing around each card
  },
});
