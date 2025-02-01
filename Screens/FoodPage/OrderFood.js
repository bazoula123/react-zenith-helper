import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, StatusBar, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderHeader from './components/OrderHeader';
import FoodInfoCard from './components/FoodInfoCard';
import QuantitySelector from './components/QuantitySelector';
import ImportantNotes from './components/ImportantNotes';
import ConfirmButton from './components/ConfirmButton';

const OrderFood = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { foodData } = route.params;
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = parseInt(foodData.actualquantity_food) || 1;

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(119, 146, 189, 0.1)', 'rgba(255, 255, 255, 0)']}
        style={styles.gradient}
      >
        <OrderHeader navigation={navigation} title={t('Order Details')} />
        
        <ScrollView 
          style={styles.contentContainer} 
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.mainContent}>
            <FoodInfoCard foodData={foodData} />
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{t('Availability')}</Text>
              <View style={styles.availabilityInfo}>
                <Icon name="time-outline" size={20} color="#7792bd" />
                <Text style={styles.availabilityText}>
                  {foodData.availability?.time_availability}
                </Text>
              </View>
              <View style={styles.availabilityInfo}>
                <Icon name="location-outline" size={20} color="#7792bd" />
                <Text style={styles.availabilityText}>
                  {foodData.availability?.adresse_availability}
                </Text>
              </View>
            </View>

            <QuantitySelector 
              quantity={quantity}
              maxQuantity={maxQuantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />

            <ImportantNotes />
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>{t('Total Quantity')}:</Text>
            <Text style={styles.priceValue}>{quantity} {foodData.quantitytype_food}</Text>
          </View>
          <ConfirmButton onPress={() => {}} text={t('Confirm Request')} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 90 : StatusBar.currentHeight + 60,
  },
  mainContent: {
    paddingBottom: 100,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  availabilityText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7792bd',
  },
});

export default OrderFood;