
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../common/design';

const FloatingLocationButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <MaterialIcons name="my-location" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: '25%', // Adjusted to be a bit higher on the screen
    zIndex: 4, // Ensure it's above the map but below the panel
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default FloatingLocationButton;
