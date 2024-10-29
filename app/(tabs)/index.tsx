import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

const initialCardData = Array.from({ length: 20 }, (_, index) => ({
  id: index.toString(),
  title: `Product ${index + 1}`,
  content: `Product Title ${index + 1}`,
  imageUri: `https://picsum.photos/700?random=${index}`,
  isFavourite: false,
  rating: 3,
}));

export default function HomeScreen({ navigation }) {
  const [cardData, setCardData] = useState(initialCardData);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = (id) => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.id === id ? { ...card, isFavourite: !card.isFavourite } : card
      )
    );
  };

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      const newCards = Array.from({ length: 10 }, (_, index) => ({
        id: (cardData.length + index).toString(),
        title: `Product ${cardData.length + index + 1}`,
        content: `Product title ${cardData.length + index + 1}`,
        imageUri: `https://picsum.photos/700?random=${cardData.length + index}`,
        isFavourite: false,
        rating: 2,
      }));

      setCardData((prevData) => [...prevData, ...newCards]);
      setLoading(false);
    }, 1500);
  };

 const renderStars = (rating) => (
   <View style={styles.singleStarContainer}>
     <Ionicons name="star" size={20} color="gold" />
     <ThemedText style={styles.ratingText}>{rating}</ThemedText>
   </View>
 );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.coverContainer}>
        <Card.Cover source={{ uri: item.imageUri }} style={styles.cover} />
        <View style={styles.ratingOverlay}>
          {renderStars(item.rating)}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Ionicons
              name={item.isFavourite ? "heart" : "heart-outline"}
              size={20}
              color={item.isFavourite ? "#FF5733" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Card.Content style={styles.content}>
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
        numColumns={2}
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    padding: 5,
  },
  cardContainer: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 5,
  },
  coverContainer: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 5,
  },
  cover: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  content: {
    marginTop: 10,
  },
  starContainer: {
    flexDirection: "row",
  },
  ratingOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center", // Center stars vertically
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 50,
    padding: 5,
  },
  singleStarContainer: {
    flexDirection: "row",
    alignItems: "center", // Center the star and text vertically
  },
  ratingText: {
    marginLeft: 3, // Space between the star and the rating text
    color: "white", // Adjust color as needed
  },
});
