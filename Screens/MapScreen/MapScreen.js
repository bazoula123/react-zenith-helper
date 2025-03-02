
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterNavigator from '../FooterNavigator/FooterNavigator';
import MapComponent from './Components/MapComponent';
import FloatingLocationButton from './Components/FloatingLocationButton';
import ActionButtons from './Components/ActionButtons';
import SearchBarComponent from './Components/SearchBarComponent';
import HeaderMap from '../Commons/HeaderMap';
import { Colors } from '../../common/design';

const MapScreen = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  // Add responsive layout
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const handleRegionChange = (region) => {
    setMapRegion(region);
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  const handleUserLocation = () => {
    console.log('Locate user');
    // Implement user location functionality here
  };

  const isLandscape = dimensions.width > dimensions.height;
  const isSmallDevice = dimensions.width < 375;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      <View style={styles.mapContainer}>
        <MapComponent onRegionChange={handleRegionChange} />
        
        <SafeAreaView edges={['top']} style={styles.contentContainer}>
          <HeaderMap />
          
          <View style={[
            styles.searchBarContainer, 
            isLandscape && styles.searchBarContainerLandscape,
            isSmallDevice && styles.searchBarContainerSmall
          ]}>
            <SearchBarComponent onSearch={handleSearch} />
          </View>
          
          <FloatingLocationButton onPress={handleUserLocation} />
          <ActionButtons />
        </SafeAreaView>
      </View>

      <View style={styles.footerContainer}>
        <FooterNavigator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 100,
    left: 16,
    right: 16,
    zIndex: 5,
  },
  searchBarContainerLandscape: {
    top: 70,
    left: 100,
    right: 100,
  },
  searchBarContainerSmall: {
    top: 80,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default MapScreen;
