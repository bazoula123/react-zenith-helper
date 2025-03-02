
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography } from '../../../common/design';

const ActionButtons = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const isSmallDevice = windowWidth < 375;

  const handleDonateFood = () => {
    navigation.navigate('DonateScreen');
  };

  const handleFindNGO = () => {
    navigation.navigate('NgoFindScreen');
  };

  return (
    <View style={[styles.container, isSmallDevice && styles.containerSmall]}>
      <TouchableOpacity
        style={[styles.actionButton, isSmallDevice && styles.actionButtonSmall]}
        onPress={handleDonateFood}
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name="restaurant" 
          size={isSmallDevice ? 18 : 24} 
          color="white" 
        />
        <Text style={[styles.buttonText, isSmallDevice && styles.buttonTextSmall]}>
          Donate Food
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton, 
          styles.findNgoButton, 
          isSmallDevice && styles.actionButtonSmall
        ]}
        onPress={handleFindNGO}
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name="location-on" 
          size={isSmallDevice ? 18 : 24} 
          color="white" 
        />
        <Text style={[styles.buttonText, isSmallDevice && styles.buttonTextSmall]}>
          Find NGO
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    bottom: 130, // Adjusted to be higher than the footer
    flexDirection: 'column',
    gap: 12,
    zIndex: 4,
  },
  containerSmall: {
    left: 12,
    bottom: 100,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  actionButtonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  findNgoButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonTextSmall: {
    fontSize: 12,
  },
});

export default ActionButtons;
