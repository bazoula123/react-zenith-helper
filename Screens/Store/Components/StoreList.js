import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StoreList = ({ stores }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.storeContainer}>
      <Image source={{ uri: item.image }} style={styles.storeImage} />
      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{item.name}</Text>
        <Text style={styles.storeDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={stores}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  storeContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  storeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  storeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  reviews: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});

export default StoreList;