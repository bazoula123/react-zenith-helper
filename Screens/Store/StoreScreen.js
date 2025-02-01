import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Commons/Header';
import FooterNavigator from '../FooterNavigator/FooterNavigator';
import SearchBar from './Components/SearchBar';
import Categories from './Components/Categories';
import StoreList from './Components/StoreList';

const mockStores = [
  {
    id: '1',
    name: 'Electronics Hub',
    description: 'Latest gadgets and electronics at great prices',
    image: 'https://picsum.photos/200',
    rating: 4.5,
    reviews: 128,
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Fashion Store',
    description: 'Trendy fashion items for all seasons',
    image: 'https://picsum.photos/201',
    rating: 4.3,
    reviews: 95,
    category: 'Fashion',
  },
  {
    id: '3',
    name: 'Home Decor',
    description: 'Beautiful home decoration items',
    image: 'https://picsum.photos/202',
    rating: 4.7,
    reviews: 156,
    category: 'Home',
  },
];

export default function StoreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = mockStores.filter((store) => {
    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <SearchBar onSearch={setSearchQuery} />
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <StoreList stores={filteredStores} />
      </View>
      <FooterNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE7F6',
  },
  content: {
    flex: 1,
  },
});