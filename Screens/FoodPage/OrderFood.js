import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';

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
      <OrderHeader navigation={navigation} title={t('Order Details')} />
      
      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <FoodInfoCard foodData={foodData} />
        <QuantitySelector 
          quantity={quantity}
          maxQuantity={maxQuantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <ImportantNotes />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <ConfirmButton onPress={() => {}} text={t('Confirm Request')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginTop: Platform.OS === 'ios' ? 90 : StatusBar.currentHeight + 40,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
});

export default OrderFood;