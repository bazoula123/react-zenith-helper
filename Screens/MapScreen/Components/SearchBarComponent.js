
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
      <Searchbar
        placeholder={t('MapScreen.Searchformeals')}
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        iconColor={Colors.primary}
        clearButtonMode="while-editing"
        onClearIconPress={handleClear}
        theme={{ roundness: 8 }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    ...Shadows.small,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#F0F0F5',
    borderRadius: BorderRadius.md,
    elevation: 0,
    height: 44,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});

export default SearchBarComponent;
