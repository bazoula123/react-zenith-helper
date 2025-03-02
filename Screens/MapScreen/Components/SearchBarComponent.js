
import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors, BorderRadius, Shadows } from '../../../common/design';

const SearchBarComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch?.('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <Searchbar
          placeholder={t('MapScreen.Searchformeals')}
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor={Colors.primary}
          clearButtonMode="while-editing"
          onClearIconPress={handleClear}
          theme={{ roundness: BorderRadius.lg }}
          elevation={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
  },
  searchBarWrapper: {
    paddingVertical: 10,
    ...Shadows.medium,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    elevation: 0,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  searchInput: {
    fontSize: 15,
  },
});

export default SearchBarComponent;
