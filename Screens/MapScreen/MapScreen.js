
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      <SafeAreaView style={styles.mapContainer} edges={['top']}>
        <MapComponent onRegionChange={handleRegionChange} />
        
        <HeaderMap />
        
        <View style={styles.searchBarContainer}>
          <SearchBarComponent 
            onSearch={handleSearch}
            onLocate={handleUserLocation}
          />
        </View>
        
        <FloatingLocationButton />
        <ActionButtons />
      </SafeAreaView>

      <View style={styles.footerContainer}>
        <FooterNavigator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 5,
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
