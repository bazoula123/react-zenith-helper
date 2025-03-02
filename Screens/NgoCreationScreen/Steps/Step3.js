
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../common/design';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Step3Style';

const Step3 = ({ onNext, initialData = {} }) => {
  const navigation = useNavigation();
  const [addressLine1, setAddressLine1] = useState(initialData.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(initialData.addressLine2 || '');
  const [city, setCity] = useState(initialData.city || '');
  const [state, setState] = useState(initialData.state || '');
  const [country, setCountry] = useState(initialData.country || '');
  const [postalCode, setPostalCode] = useState(initialData.postalCode || '');
  const [useMapPicker, setUseMapPicker] = useState(initialData.useMapPicker || false);
  const [mapLocation, setMapLocation] = useState(initialData.mapLocation || null);
  
  const [activeInput, setActiveInput] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check for location data returned from the map picker
    const checkAddressData = async () => {
      try {
        const addressData = await AsyncStorage.getItem('selectedAddressNGO');
        if (addressData) {
          const parsedAddress = JSON.parse(addressData);
          setAddressLine1(parsedAddress.name || '');
          setCity(parsedAddress.city || '');
          setState(parsedAddress.region || '');
          setCountry(parsedAddress.country || '');
          setPostalCode(parsedAddress.postalCode || '');
          
          setMapLocation({
            latitude: parsedAddress.latitude,
            longitude: parsedAddress.longitude,
          });
          
          // Clear the stored address
          await AsyncStorage.removeItem('selectedAddressNGO');
        }
      } catch (error) {
        console.error('Error loading address data:', error);
      }
    };
    
    checkAddressData();
    // Poll for address changes
    const intervalId = setInterval(checkAddressData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePickLocation = () => {
    // Navigate to address picker
    navigation.navigate('AdressPickerScreen', { 
      storageKey: 'selectedAddressNGO'
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!addressLine1 && !mapLocation) {
      newErrors.address = 'Please provide an address or use the map to select a location';
    }
    
    if (!city) {
      newErrors.city = 'City is required';
    }
    
    if (!country) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        postalCode,
        useMapPicker,
        mapLocation,
      });
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.sectionSubtitle}>
          Provide the location of your foundation
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.mapPickerToggle}>
          <Text style={styles.label}>Use map to select location</Text>
          <Switch
            value={useMapPicker}
            onValueChange={setUseMapPicker}
            trackColor={{ false: '#E0E0E0', true: Colors.secondary }}
            thumbColor={useMapPicker ? Colors.primary : '#F4F4F4'}
          />
        </View>
        
        {useMapPicker ? (
          <View style={styles.mapPickerContainer}>
            <TouchableOpacity 
              style={styles.mapPickerButton}
              onPress={handlePickLocation}
            >
              <MaterialIcons name="map" size={24} color="white" />
              <Text style={styles.mapPickerText}>
                {mapLocation ? 'Change Location on Map' : 'Select Location on Map'}
              </Text>
            </TouchableOpacity>
            
            {mapLocation && (
              <View style={styles.selectedLocationContainer}>
                <MaterialIcons name="check-circle" size={24} color={Colors.success} />
                <Text style={styles.selectedLocationText}>Location selected</Text>
              </View>
            )}
          </View>
        ) : (
          <>
            <Text style={styles.label}>Address</Text>
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            <View 
              style={[
                styles.inputContainer, 
                activeInput === 'addressLine1' && styles.inputContainerActive,
                errors.address && styles.inputContainerError,
                { marginBottom: 12 }
              ]}
            >
              <MaterialIcons 
                name="home" 
                size={24} 
                color={activeInput === 'addressLine1' ? Colors.primary : '#666'} 
              />
              <TextInput
                style={styles.input}
                placeholder="Street address"
                value={addressLine1}
                onChangeText={setAddressLine1}
                onFocus={() => setActiveInput('addressLine1')}
                onBlur={() => setActiveInput(null)}
              />
            </View>
            
            <View 
              style={[
                styles.inputContainer, 
                activeInput === 'addressLine2' && styles.inputContainerActive,
                { marginBottom: 12 }
              ]}
            >
              <MaterialIcons 
                name="apartment" 
                size={24} 
                color={activeInput === 'addressLine2' ? Colors.primary : '#666'} 
              />
              <TextInput
                style={styles.input}
                placeholder="Apt, Suite, Building (optional)"
                value={addressLine2}
                onChangeText={setAddressLine2}
                onFocus={() => setActiveInput('addressLine2')}
                onBlur={() => setActiveInput(null)}
              />
            </View>
          </>
        )}
        
        <View style={styles.rowContainer}>
          <View style={[styles.columnContainer, { marginRight: 8 }]}>
            <Text style={styles.label}>City</Text>
            <View 
              style={[
                styles.inputContainer, 
                activeInput === 'city' && styles.inputContainerActive,
                errors.city && styles.inputContainerError
              ]}
            >
              <MaterialIcons 
                name="location-city" 
                size={24} 
                color={activeInput === 'city' ? Colors.primary : '#666'} 
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
                onFocus={() => setActiveInput('city')}
                onBlur={() => setActiveInput(null)}
              />
            </View>
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
          </View>
          
          <View style={styles.columnContainer}>
            <Text style={styles.label}>State/Province</Text>
            <View 
              style={[
                styles.inputContainer, 
                activeInput === 'state' && styles.inputContainerActive
              ]}
            >
              <MaterialIcons 
                name="place" 
                size={24} 
                color={activeInput === 'state' ? Colors.primary : '#666'} 
              />
              <TextInput
                style={styles.input}
                placeholder="State/Province"
                value={state}
                onChangeText={setState}
                onFocus={() => setActiveInput('state')}
                onBlur={() => setActiveInput(null)}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.rowContainer}>
          <View style={[styles.columnContainer, { marginRight: 8 }]}>
            <Text style={styles.label}>Country</Text>
            <View 
              style={[
                styles.inputContainer, 
                activeInput === 'country' && styles.inputContainerActive,
                errors.country && styles.inputContainerError
              ]}
            >
              <MaterialIcons 
                name="public" 
                size={24} 
                color={activeInput === 'country' ? Colors.primary : '#666'} 
              />
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
                onFocus={() => setActiveInput('country')}
                onBlur={() => setActiveInput(null)}
              />
            </View>
            {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
          </View>
          
          <View style={styles.columnContainer}>
            <Text style={styles.label}>Postal Code</Text>
            <View 
              style={[
                styles.inputContainer, 
                activeInput === 'postalCode' && styles.inputContainerActive
              ]}
            >
              <MaterialIcons 
                name="markunread-mailbox" 
                size={24} 
                color={activeInput === 'postalCode' ? Colors.primary : '#666'} 
              />
              <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={postalCode}
                onChangeText={setPostalCode}
                onFocus={() => setActiveInput('postalCode')}
                onBlur={() => setActiveInput(null)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
        <Text style={styles.submitButtonText}>Create Foundation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step3;
