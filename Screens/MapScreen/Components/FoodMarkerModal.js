
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../common/design';

const FoodMarkerModal = ({ isVisible, onClose, foodData }) => {
  const navigation = useNavigation();

  if (!foodData) return null;

  const handleViewDetails = () => {
    navigation.navigate('FoodDetail', { foodId: foodData.id_food });
    onClose();
  };

  const imageUrl = foodData.first_image || (foodData.images && foodData.images.length > 0 
    ? foodData.images[0] 
    : null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="close-circle" size={32} color={Colors.primary} />
          </TouchableOpacity>

          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {imageUrl && (
              <Image
                source={{ uri: `http://192.168.1.11:5002/api/${imageUrl}` }}
                style={styles.foodImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.infoContainer}>
              <Text style={styles.title}>{foodData.name_food}</Text>
              <Text style={styles.description} numberOfLines={3}>
                {foodData.description_food}
              </Text>

              <View style={styles.detailsRow}>
                <Icon name="location-outline" size={20} color={Colors.primary} />
                <Text style={styles.detailText}>
                  {foodData.availability?.adresse_availability || 'No address available'}
                </Text>
              </View>

              <View style={styles.detailsRow}>
                <Icon name="time-outline" size={20} color={Colors.primary} />
                <Text style={styles.detailText}>
                  {foodData.availability?.time_availability || 'No time available'}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={handleViewDetails}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '70%',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  foodImage: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#444',
    flex: 1,
  },
  detailsButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodMarkerModal;
