
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapCustomStyle } from '../mapStyle';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../common/design';
import FoodMarkerModal from './FoodMarkerModal';
import CustomMarker from './CustomMarker';

const MapComponent = ({ onRegionChange }) => {
  const [foodLocations, setFoodLocations] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    fetchFoodLocations();
  }, []);

  const fetchFoodLocations = async () => {
    try {
      const response = await fetch('http://192.168.1.11:5002/api/foods/foodlocations');
      const data = await response.json();
      console.log('Fetched food locations:', data);
      setFoodLocations(data);
    } catch (error) {
      console.error('Error fetching food locations:', error);
      Alert.alert('Error', 'Could not fetch food locations. Please try again later.');
    }
  };

  const handleMarkerPress = (food) => {
    setSelectedFood(food);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const animateToRegion = (region) => {
    mapRef.current?.animateToRegion(region, 1000);
  };

  const handleUserLocationChange = (event) => {
    const { coordinate } = event.nativeEvent;
    setUserLocation(coordinate);
  };

  // Add method to navigate to user's location
  const goToUserLocation = () => {
    if (userLocation) {
      const region = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      animateToRegion(region);
      console.log('Navigating to user location:', region);
      return true;
    } else {
      console.log('User location not available yet');
      Alert.alert('Location', 'Waiting for your location. Please make sure location services are enabled.');
      return false;
    }
  };

  const initialRegion = {
    latitude: 45.5017,
    longitude: -73.5673,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Expose the goToUserLocation method via useImperativeHandle or via props
  React.useImperativeHandle(
    ref,
    () => ({
      goToUserLocation,
    }),
    [userLocation]
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapCustomStyle}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        showsBuildings={true}
        showsTraffic={false}
        showsIndoors={true}
        toolbarEnabled={false}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.secondary}
        loadingBackgroundColor="#FFFFFF"
        onRegionChange={onRegionChange}
        onUserLocationChange={handleUserLocationChange}
        minZoomLevel={10}
        maxZoomLevel={20}
        rotateEnabled={true}
      >
        {foodLocations.map((food) => (
          <CustomMarker
            key={food.id_food}
            food={food}
            onPress={() => handleMarkerPress(food)}
          />
        ))}
      </MapView>

      <FoodMarkerModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        foodData={selectedFood}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default React.forwardRef(MapComponent);
