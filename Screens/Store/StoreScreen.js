import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Commons/Header';
import FooterNavigator from '../FooterNavigator/FooterNavigator';
import Categories from './Components/Categories';
import StoreList from './Components/StoreList';

const mockStores = [
  {
    id: '1',
    name: 'Electronics Hub',
    description: 'Discover the latest in cutting-edge technology and electronics. Our curated selection of gadgets and devices brings innovation to your fingertips. From smartphones to smart home devices, find everything you need to stay connected and ahead of the curve.',
    image: 'https://picsum.photos/200',
    rating: 4.5,
    reviews: 128,
    category: 'Electronics',
    date: '2024-03-15',
    author: 'Tech Team',
  },
  {
    id: '2',
    name: 'Fashion Store',
    description: 'Step into style with our carefully selected fashion collection. Experience the perfect blend of comfort and elegance with our seasonal selections. From casual wear to formal attire, we have everything to keep you looking your best.',
    image: 'https://picsum.photos/201',
    rating: 4.3,
    reviews: 95,
    category: 'Fashion',
    date: '2024-03-14',
    author: 'Style Team',
  },
  {
    id: '3',
    name: 'Home Decor',
    description: 'Transform your living space with our exquisite home decoration items. Create the perfect ambiance with our range of modern and classic decor pieces. Each item is selected to bring beauty and functionality to your home.',
    image: 'https://picsum.photos/202',
    rating: 4.7,
    reviews: 156,
    category: 'Home',
    date: '2024-03-13',
    author: 'Interior Design Team',
  },
];

export default function StoreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStores = mockStores.filter((store) => {
    return selectedCategory === 'All' || store.category === selectedCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
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