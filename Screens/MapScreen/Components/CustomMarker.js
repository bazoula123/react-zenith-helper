
import React from 'react';
import { Marker } from 'react-native-maps';
import { View, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../common/design';

const CustomMarker = ({ food, onPress }) => {
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
      onPress={() => onPress?.(food)}
    >
      <View style={styles.markerContainer}>
        <View style={styles.markerRing}>
          <View style={styles.markerOuter}>
            <MaterialIcons name="restaurant-menu" size={18} color="white" />
          </View>
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
  markerRing: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  markerOuter: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
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
    borderTopColor: Colors.primary,
    transform: [{ translateY: -3 }],
  },
});

export default CustomMarker;
