
import React from 'react';
import { Marker } from 'react-native-maps';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
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
        <View style={styles.markerOuter}>
          <MaterialIcons name="restaurant" size={20} color="white" />
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
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.primary,
    transform: [{ translateY: -5 }],
  },
});

export default CustomMarker;
