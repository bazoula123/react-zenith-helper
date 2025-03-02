
import React, { useState } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors, BorderRadius, Shadows } from '../../../common/design';

const SearchBarComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

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
      <View style={[styles.searchBarWrapper, isSmallDevice && styles.searchBarWrapperSmall]}>
        <Searchbar
          placeholder={t('MapScreen.Searchformeals')}
          onChangeText={handleSearch}
          value={searchQuery}
          style={[styles.searchBar, isSmallDevice && styles.searchBarSmall]}
          inputStyle={[styles.searchInput, isSmallDevice && styles.searchInputSmall]}
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
    width: '100%',
  },
  searchBarWrapper: {
    padding: 0,
    ...Shadows.medium,
  },
  searchBarWrapperSmall: {
    padding: 0,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  searchBarSmall: {
    height: 40,
  },
  searchInput: {
    fontSize: 15,
  },
  searchInputSmall: {
    fontSize: 13,
  },
});

export default SearchBarComponent;
