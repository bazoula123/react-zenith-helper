
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  Image, ScrollView, Dimensions, StatusBar, ActivityIndicator 
} from 'react-native';
import { Searchbar, Chip, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../common/design';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { searchItems } from '../HomeScreen/services/foodService';

const { width } = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
  return Math.round(size * scale);
};

const CATEGORIES = [
  { id: 'meals', name: 'Meals', icon: 'fast-food-outline' },
  { id: 'ngos', name: 'NGOs', icon: 'people-outline' },
  { id: 'events', name: 'Events', icon: 'calendar-outline' },
];

// Mock data for recent searches - would be stored in AsyncStorage in a real app
const MOCK_RECENT_SEARCHES = [
  'Vegetarian meals',
  'Food banks',
  'Donation events',
  'Homeless shelters',
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(MOCK_RECENT_SEARCHES);
  const navigation = useNavigation();
  const { t } = useTranslation();

  // Function to fetch search results
  const fetchSearchResults = useCallback(async (query, category) => {
    setIsLoading(true);
    try {
      // Map our category names to the backend's expected format
      let typeFilter = null;
      if (category) {
        if (category === 'meals') typeFilter = 'meal';
        else if (category === 'ngos') typeFilter = 'ngo';
        else if (category === 'events') typeFilter = 'event';
      }
      
      const data = await searchItems(query, typeFilter);
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to trigger search when query or category changes
  useEffect(() => {
    if (searchQuery.length > 0) {
      const debounceTimeout = setTimeout(() => {
        fetchSearchResults(searchQuery, selectedCategory);
      }, 500);
      
      return () => clearTimeout(debounceTimeout);
    } else {
      setResults([]);
    }
  }, [searchQuery, selectedCategory, fetchSearchResults]);

  const addToRecentSearches = (query) => {
    if (!query.trim()) return;
    
    // Remove if already exists (to move it to the top)
    const filteredSearches = recentSearches.filter(
      search => search.toLowerCase() !== query.toLowerCase()
    );
    
    // Add to the beginning of the array and limit to 5 recent searches
    setRecentSearches([query, ...filteredSearches].slice(0, 5));
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    // No need to add to recent searches here, we'll do it on submit
  };

  const filterByCategory = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleItemPress = (item) => {
    switch (item.type) {
      case 'meal':
        navigation.navigate('FoodDetail', { id: item.id });
        break;
      case 'ngo':
        navigation.navigate('NGODetail', { id: item.id });
        break;
      case 'event':
        navigation.navigate('CommunityScreen');
        break;
      default:
        break;
    }
  };

  const renderRecentSearches = () => {
    if (searchQuery.length > 0) return null;
    
    return (
      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>{t('SearchScreen.recent_searches')}</Text>
        {recentSearches.map((search, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.recentItem}
            onPress={() => setSearchQuery(search)}
          >
            <Icon name="time-outline" size={normalize(18)} color={Colors.textSecondary} />
            <Text style={styles.recentText}>{search}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCategoryFilter = () => {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <Chip
            key={category.id}
            icon={() => <Icon name={category.icon} size={normalize(16)} color={selectedCategory === category.id ? '#fff' : Colors.primary} />}
            selected={selectedCategory === category.id}
            onPress={() => filterByCategory(category.id)}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.selectedCategoryChip
            ]}
            textStyle={[
              styles.categoryChipText,
              selectedCategory === category.id && styles.selectedCategoryChipText
            ]}
          >
            {t(`SearchScreen.${category.id}`)}
          </Chip>
        ))}
      </ScrollView>
    );
  };

  const renderItem = ({ item }) => {
    const getIconForType = () => {
      switch (item.type) {
        case 'meal':
          return 'fast-food-outline';
        case 'ngo':
          return 'people-outline';
        case 'event':
          return 'calendar-outline';
        default:
          return 'information-circle-outline';
      }
    };

    return (
      <TouchableOpacity
        style={styles.resultCard}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
        <View style={styles.resultContent}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
            <View style={[styles.badgeContainer, styles.badgeType]}>
              <Icon name={getIconForType()} size={normalize(12)} color="#fff" />
              <Text style={styles.badgeText}>
                {t(`SearchScreen.${item.type}s`)}
              </Text>
            </View>
          </View>
          <Text style={styles.resultDescription} numberOfLines={2}>{item.description}</Text>
          
          {item.tags && (
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, index) => (
                <View key={index} style={styles.tagBadge}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
          
          <View style={styles.resultFooter}>
            <View style={styles.distanceContainer}>
              <Icon name="location-outline" size={normalize(14)} color={Colors.textSecondary} />
              <Text style={styles.distanceText}>{item.distance}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>{t('SearchScreen.searching')}</Text>
        </View>
      );
    }

    if (searchQuery.length > 0 && results.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Icon name="search-outline" size={normalize(50)} color={Colors.textSecondary} />
          <Text style={styles.noResultsText}>{t('SearchScreen.no_results')}</Text>
          <Text style={styles.noResultsSubText}>{t('SearchScreen.try_different')}</Text>
        </View>
      );
    }

    if (results.length > 0) {
      return (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
        />
      );
    }

    return (
      <ScrollView 
        style={styles.initialContent}
        showsVerticalScrollIndicator={false}
      >
        {renderRecentSearches()}
        <View style={styles.suggestedContainer}>
          <Text style={styles.sectionTitle}>{t('SearchScreen.suggested_for_you')}</Text>
          <View style={styles.suggestedGrid}>
            {/* This would be populated from API in a real app */}
            {[...Array(4)].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedItem}
                activeOpacity={0.8}
              >
                <View style={styles.suggestedPlaceholder}>
                  <Icon 
                    name={index % 3 === 0 ? "fast-food-outline" : index % 3 === 1 ? "people-outline" : "calendar-outline"} 
                    size={normalize(30)} 
                    color={Colors.primary} 
                  />
                </View>
                <View style={styles.suggestedOverlay}>
                  <Text style={styles.suggestedTitle} numberOfLines={1}>
                    {index % 3 === 0 ? "Local Meals" : index % 3 === 1 ? "Nearby NGOs" : "Upcoming Events"}
                  </Text>
                  <View style={styles.suggestedTypeContainer}>
                    <Icon 
                      name={index % 3 === 0 ? "fast-food-outline" : index % 3 === 1 ? "people-outline" : "calendar-outline"}
                      size={normalize(12)} 
                      color={Colors.primary} 
                    />
                    <Text style={styles.suggestedType}>
                      {index % 3 === 0 ? t('SearchScreen.meals') : index % 3 === 1 ? t('SearchScreen.ngos') : t('SearchScreen.events')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={normalize(24)} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Searchbar
          placeholder={t('SearchScreen.search_placeholder')}
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={Colors.primary}
          inputStyle={styles.searchInput}
          autoFocus={true}
          onSubmitEditing={() => {
            if (searchQuery.trim().length > 0) {
              addToRecentSearches(searchQuery);
            }
          }}
        />
      </View>

      {renderCategoryFilter()}
      
      <Divider style={styles.divider} />
      
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
  },
  backButton: {
    marginRight: normalize(12),
    padding: normalize(4),
  },
  searchBar: {
    flex: 1,
    elevation: 0,
    backgroundColor: '#F5F5F5',
    borderRadius: BorderRadius.md,
    height: normalize(46),
  },
  searchInput: {
    fontSize: normalize(16),
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
    gap: normalize(8),
  },
  categoryChip: {
    backgroundColor: '#F0F0F5',
    borderRadius: BorderRadius.round,
    height: normalize(38),
    paddingHorizontal: normalize(12),
  },
  selectedCategoryChip: {
    backgroundColor: Colors.primary,
  },
  categoryChipText: {
    ...Typography.labelMedium,
    color: Colors.primary,
  },
  selectedCategoryChipText: {
    color: '#FFFFFF',
  },
  divider: {
    backgroundColor: '#EFEFEF',
    height: 1,
  },
  initialContent: {
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(12),
  },
  recentContainer: {
    marginBottom: normalize(24),
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: normalize(12),
    color: Colors.textPrimary,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  recentText: {
    ...Typography.bodyMedium,
    marginLeft: normalize(10),
    color: Colors.textSecondary,
  },
  suggestedContainer: {
    flex: 1,
    marginBottom: normalize(24),
  },
  suggestedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: normalize(-4),
  },
  suggestedItem: {
    width: (width - normalize(40)) / 2,
    height: normalize(160),
    marginHorizontal: normalize(4),
    marginBottom: normalize(16),
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    ...Shadows.medium,
  },
  suggestedPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestedOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: normalize(8),
    borderTopLeftRadius: BorderRadius.sm,
    borderTopRightRadius: BorderRadius.sm,
  },
  suggestedTitle: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
    marginBottom: normalize(4),
  },
  suggestedTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestedType: {
    ...Typography.caption,
    color: Colors.primary,
    marginLeft: normalize(4),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(16),
  },
  loadingText: {
    ...Typography.bodyMedium,
    marginTop: normalize(12),
    color: Colors.textSecondary,
  },
  noResultsText: {
    ...Typography.h3,
    marginTop: normalize(16),
    color: Colors.textPrimary,
  },
  noResultsSubText: {
    ...Typography.bodyMedium,
    marginTop: normalize(8),
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  resultsList: {
    padding: normalize(16),
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    marginBottom: normalize(16),
    overflow: 'hidden',
    ...Shadows.small,
  },
  resultImage: {
    width: normalize(120),
    height: normalize(140),
    resizeMode: 'cover',
  },
  resultContent: {
    flex: 1,
    padding: normalize(12),
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: normalize(4),
  },
  resultTitle: {
    ...Typography.labelLarge,
    flex: 1,
    marginRight: normalize(8),
    color: Colors.textPrimary,
  },
  badgeContainer: {
    flexDirection: 'row',
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(2),
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  badgeType: {
    backgroundColor: Colors.primary,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: normalize(10),
    fontWeight: '500',
    marginLeft: normalize(2),
  },
  resultDescription: {
    ...Typography.bodySmall,
    marginBottom: normalize(8),
    color: Colors.textSecondary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: normalize(8),
    gap: normalize(4),
  },
  tagBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(2),
    borderRadius: BorderRadius.sm,
    marginRight: normalize(4),
    marginBottom: normalize(4),
  },
  tagText: {
    fontSize: normalize(10),
    color: Colors.textSecondary,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    ...Typography.caption,
    marginLeft: normalize(4),
    color: Colors.textSecondary,
  },
});

export default SearchScreen;
