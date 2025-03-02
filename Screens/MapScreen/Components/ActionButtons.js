
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../common/design';

const ActionButtons = () => {
  const navigation = useNavigation();

  const handleDonateFood = () => {
    navigation.navigate('DonateScreen');
  };

  const handleFindNGO = () => {
    navigation.navigate('NgoFindScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleDonateFood}
        activeOpacity={0.8}
      >
        <MaterialIcons name="restaurant" size={24} color="white" />
        <Text style={styles.buttonText}>Donate Food</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.findNgoButton]}
        onPress={handleFindNGO}
        activeOpacity={0.8}
      >
        <MaterialIcons name="location-on" size={24} color="white" />
        <Text style={styles.buttonText}>Find NGO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    bottom: '25%', // Adjusted to be a bit higher on the screen
    flexDirection: 'column',
    gap: 12,
    zIndex: 4, // Make sure this is lower than the draggable panel but above the map
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  findNgoButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ActionButtons;
