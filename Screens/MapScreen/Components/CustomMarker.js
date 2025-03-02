
import React from 'react';
import { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../common/design';

const CustomMarker = ({ food }) => {
  if (!food || !food.availability) return null;
  
  // Parse latitude and longitude safely
  const parseCoordinate = (coord) => {
    if (!coord) return 0;
    const cleaned = typeof coord === 'string' ? coord.replace(/\"/g, '') : coord;
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const latitude = parseCoordinate(food.availability.altitude_availability);
  const longitude = parseCoordinate(food.availability.longitude_availability);
  
  // Don't render markers with invalid coordinates
  if (latitude === 0 && longitude === 0) return null;

  return (
    <Marker
      coordinate={{ latitude, longitude }}
      tracksViewChanges={false}
    >
      <View style={styles.markerContainer}>
        <View style={styles.markerOuter}>
          <Icon name="fast-food" size={20} color={Colors.primary} />
        </View>
        <View style={styles.markerTriangle} />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  markerOuter: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    transform: [{ translateY: -5 }],
  },
});

export default CustomMarker;
