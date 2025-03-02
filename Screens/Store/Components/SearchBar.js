
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors, BorderRadius, Shadows } from '../../../common/design';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('StoreScreen.search_placeholder')}
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        iconColor={Colors.primary}
        theme={{ roundness: 8 }}
        elevation={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    ...Shadows.small,
  },
  searchBar: {
    borderRadius: BorderRadius.md,
    backgroundColor: '#F0F0F5',
    elevation: 0,
    height: 44,
  },
  searchInput: {
    fontSize: 15,
  },
});

export default SearchBar;
