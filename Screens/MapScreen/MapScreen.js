
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterNavigator from '../FooterNavigator/FooterNavigator';
import DraggableSearch from './Components/DraggableSearch';
import MapComponent from './Components/MapComponent';
import FloatingLocationButton from './Components/FloatingLocationButton';
import ActionButtons from './Components/ActionButtons';
import { Colors } from '../../common/design';

const MapScreen = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const handleRegionChange = (region) => {
    setMapRegion(region);
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  const handleDragStateChange = (isExpanded) => {
    setIsPanelExpanded(isExpanded);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={styles.mapContainer} edges={['top']}>
        <MapComponent onRegionChange={handleRegionChange} />
        
        {/* Conditionally render buttons based on panel state */}
        {!isPanelExpanded && (
          <>
            <FloatingLocationButton />
            <ActionButtons />
          </>
        )}
      </SafeAreaView>

      <View style={styles.footerAndPanelContainer}>
        <DraggableSearch
          onSearch={handleSearch}
          onDragStateChange={handleDragStateChange}
          customStyles={{
            position: 'absolute',
            bottom: 60, // Space for footer
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
            zIndex: 5, // Ensure the panel is above the map but below the footer
          }}
        />

        <View style={styles.footerContainer}>
          <FooterNavigator />
        </View>
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
  footerAndPanelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Higher z-index to ensure footer is above the panel
  },
});

export default MapScreen;
