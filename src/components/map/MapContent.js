
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import PlaceCallout from '../PlaceCallout';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../navigation/navigationConstants';

const MapContent = ({
  mapRef,
  initialRegion,
  userLocation,
  filteredPlaces = [],
  searchResults = [],
  onRegionChangeComplete,
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [mapError, setMapError] = useState(false);
  const [displayMarkers, setDisplayMarkers] = useState([]);

  // Debug logs
  console.log('MapContent render with:', { 
    hasMapRef: !!mapRef, 
    initialRegion, 
    userLocation,
    filteredPlacesCount: filteredPlaces?.length,
    searchResultsCount: searchResults?.length
  });

  // Create a valid initial region with fallback values
  const getValidRegion = useCallback(() => {
    const defaultRegion = {
      latitude: 36.7755,
      longitude: 8.7834,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    
    // If initial region is missing or invalid, return default
    if (!initialRegion || typeof initialRegion !== 'object') {
      return defaultRegion;
    }
    
    // Make sure all required properties exist and are valid numbers
    const lat = Number(initialRegion.latitude);
    const lng = Number(initialRegion.longitude);
    const latDelta = Number(initialRegion.latitudeDelta);
    const lngDelta = Number(initialRegion.longitudeDelta);
    
    if (isNaN(lat) || isNaN(lng) || isNaN(latDelta) || isNaN(lngDelta)) {
      return defaultRegion;
    }
    
    // Return validated region
    return {
      latitude: lat,
      longitude: lng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  }, [initialRegion]);

  // Process and validate places data
  useEffect(() => {
    try {
      // Determine which array to use (search results or filtered places)
      const placesArray = searchResults?.length > 0 ? 
        (Array.isArray(searchResults) ? searchResults : []) : 
        (Array.isArray(filteredPlaces) ? filteredPlaces : []);
      
      if (placesArray.length === 0) {
        console.log('No places to display');
        setDisplayMarkers([]);
        return;
      }
      
      // Process and validate each place
      const validMarkers = placesArray
        .filter(place => {
          if (!place || typeof place !== 'object') {
            console.warn('Invalid place object filtered out');
            return false;
          }
          
          const hasLocation = place.location && typeof place.location === 'object';
          if (!hasLocation) {
            console.warn('Place missing location data filtered out');
            return false;
          }
          
          const lat = parseFloat(place.location.latitude);
          const lng = parseFloat(place.location.longitude);
          
          if (isNaN(lat) || isNaN(lng)) {
            console.warn('Place has invalid coordinates filtered out');
            return false;
          }
          
          return true;
        })
        .map((place, index) => {
          // Create a safe marker object with all required properties
          const placeId = place.id || `place-${index}-${Date.now()}`;
          
          return {
            id: placeId,
            key: `marker-${placeId}-${Date.now()}`,
            name: place.name || 'Unnamed Place',
            description: place.description || '',
            type: place.type || 'location',
            coordinate: {
              latitude: parseFloat(place.location.latitude),
              longitude: parseFloat(place.location.longitude),
            },
            location: {
              ...place.location,
              latitude: parseFloat(place.location.latitude),
              longitude: parseFloat(place.location.longitude),
              city: place.location.city || '',
              address: place.location.address || '',
            },
            // Pass through any other properties
            ...place,
          };
        });
      
      console.log(`Processed ${validMarkers.length} valid markers`);
      if (validMarkers.length > 0) {
        console.log('Sample marker:', JSON.stringify(validMarkers[0]));
      }
      
      setDisplayMarkers(validMarkers);
    } catch (error) {
      console.error('Error processing places for markers:', error);
      setDisplayMarkers([]);
    }
  }, [filteredPlaces, searchResults]);

  // Handle user location
  useEffect(() => {
    if (!mapRef?.current || !userLocation || mapError) return;
    
    try {
      // Validate user location
      const lat = Number(userLocation.latitude);
      const lng = Number(userLocation.longitude);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        const validRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        
        mapRef.current.animateToRegion(validRegion, 1000);
      }
    } catch (error) {
      console.error('Error animating to user location:', error);
    }
  }, [userLocation, mapError]);

  // Focus map on search results
  useEffect(() => {
    if (!mapRef?.current || !Array.isArray(searchResults) || searchResults.length === 0 || mapError) return;
    
    try {
      if (searchResults.length === 1) {
        const place = searchResults[0];
        if (place && place.location) {
          const lat = parseFloat(place.location.latitude);
          const lng = parseFloat(place.location.longitude);
          
          if (!isNaN(lat) && !isNaN(lng)) {
            mapRef.current.animateToRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }, 1000);
          }
        }
      } else {
        const validCoordinates = searchResults
          .filter(place => place && place.location)
          .map(place => {
            const lat = parseFloat(place.location.latitude);
            const lng = parseFloat(place.location.longitude);
            return (!isNaN(lat) && !isNaN(lng)) ? { latitude: lat, longitude: lng } : null;
          })
          .filter(Boolean);
          
        if (validCoordinates.length > 0) {
          mapRef.current.fitToCoordinates(validCoordinates, {
            edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
            animated: true,
          });
        }
      }
    } catch (error) {
      console.error('Error focusing map on search results:', error);
    }
  }, [searchResults, mapError]);

  // Navigate to place details
  const handlePlacePress = (place) => {
    try {
      if (place && place.id) {
        navigation.navigate(ROUTES.PLACE_DETAILS, { placeId: place.id });
      } else {
        console.warn('Cannot navigate: invalid place or missing ID');
      }
    } catch (error) {
      console.error('Error navigating to place details:', error);
    }
  };

  // Render error state
  if (mapError) {
    return (
      <View style={[styles.mapWrapper, styles.errorContainer]}>
        <Text style={styles.errorText}>{t('map.loadingError')}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setMapError(false)}>
          <Text style={styles.retryText}>{t('common.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mapWrapper}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={null}
        initialRegion={getValidRegion()}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
        onRegionChangeComplete={onRegionChangeComplete}
        toolbarEnabled={Platform.OS === 'android'}
        loadingEnabled
        loadingIndicatorColor={COLORS.primary}
        loadingBackgroundColor={COLORS.white}
        moveOnMarkerPress={false}
        pitchEnabled
        rotateEnabled
        zoomEnabled
        zoomControlEnabled={Platform.OS === 'android'}
        onError={(error) => {
          console.error('Map error:', error);
          setMapError(true);
        }}
        mapType="standard"
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
      >
        {displayMarkers.map((marker) => (
          <Marker
            key={marker.key}
            identifier={`marker-${marker.id}`}
            coordinate={marker.coordinate}
            pinColor={COLORS.primary}
            onPress={() => handlePlacePress(marker)}
            tracksViewChanges={false}
          >
            <Callout tooltip onPress={() => handlePlacePress(marker)}>
              <PlaceCallout
                place={marker}
                onDetailsPress={() => handlePlacePress(marker)}
              />
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapWrapper: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_gray,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 12,
    color: COLORS.error,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default MapContent;
