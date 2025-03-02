
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../common/design';

const LocationContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Popular Areas</Text>
      
      <View style={styles.locationsList}>
        <TouchableOpacity style={styles.locationItem} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="location-on" size={20} color={Colors.primary} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>Downtown Montreal</Text>
            <Text style={styles.locationMeta}>12 food options available</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.locationItem} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="location-on" size={20} color={Colors.primary} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>Mile End</Text>
            <Text style={styles.locationMeta}>8 food options available</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.locationItem} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="location-on" size={20} color={Colors.primary} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>Old Port</Text>
            <Text style={styles.locationMeta}>5 food options available</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  locationsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f0f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  locationMeta: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
});

export default LocationContainer;
