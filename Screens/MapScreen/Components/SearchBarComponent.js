
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors, BorderRadius, Shadows } from '../../../common/design';

const SearchBarComponent = ({ onSearch, onLocate }) => {
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

  const handleUserLocation = () => {
    if (onLocate) {
      onLocate();
    }
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

        <TouchableOpacity
          style={styles.locateButton}
          onPress={handleUserLocation}
          activeOpacity={0.7}
        >
          <MaterialIcons name="my-location" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    ...Shadows.medium,
  },
  searchBar: {
    flex: 1,
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
  locateButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default SearchBarComponent;
