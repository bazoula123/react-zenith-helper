
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../common/design';

const FloatingLocationButton = ({ onPress }) => {
  const windowWidth = Dimensions.get('window').width;
  const isSmallDevice = windowWidth < 375;

  return (
    <View style={[styles.container, isSmallDevice && styles.containerSmall]}>
      <TouchableOpacity
        style={[styles.button, isSmallDevice && styles.buttonSmall]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name="my-location" 
          size={isSmallDevice ? 20 : 24} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 130, // Adjusted to be higher than the footer
    zIndex: 4,
  },
  containerSmall: {
    right: 12,
    bottom: 100,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default FloatingLocationButton;
