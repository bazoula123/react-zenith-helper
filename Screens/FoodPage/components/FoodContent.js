import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodHeader from './FoodHeader';
import QuickInfo from './QuickInfo';
import LocationInfo from './LocationInfo';
import AllergyWarning from './AllergyWarning';

const FoodContent = ({ foodData, onRequestFood }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  return (
    <Animated.ScrollView 
      style={styles.contentWrapper}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    >
      <Animated.View style={[styles.headerSection, { opacity: headerOpacity }]}>
        <FoodHeader 
          title={foodData.title}
          hallal={foodData.hallal}
          foodtype={foodData.foodtype}
          expiryDate={foodData.expiryDate}
        />

        <QuickInfo 
          quantity={foodData.actualquantity_food}
          quantityType={foodData.quantitytype_food}
          isFrozen={foodData.isfrozen}
        />
      </Animated.View>

      <AllergyWarning allergens={foodData.allergens} />

      {foodData.hygienneDeclaration === 'Declared' && (
        <View style={styles.hygieneSection}>
          <Icon name="checkmark-circle" size={24} color="#059669" />
          <Text style={styles.hygieneText}>
            The donor has declared that this food was prepared under hygienic conditions
          </Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About this food</Text>
        <Text style={styles.description}>{foodData.description}</Text>
      </View>

      <LocationInfo location={foodData.location} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <Text style={styles.description}>{foodData.additionalnote}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { opacity: foodData.status === 'Available' ? 1 : 0.6 }
          ]}
          disabled={foodData.status !== 'Available'}
          onPress={onRequestFood}
        >
          <Text style={styles.actionButtonText}>
            {foodData.status === 'Available' ? 'Request Food' : 'Currently Reserved'}
          </Text>
          <Icon 
            name={foodData.status === 'Available' ? 'arrow-forward-outline' : 'lock-closed-outline'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  headerSection: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    elevation: 1,
    marginHorizontal: 20,
  },
  hygieneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  hygieneText: {
    marginLeft: 10,
    color: '#065F46',
    fontSize: 14,
    flex: 1,
    fontFamily: 'System',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'System',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
    fontFamily: 'System',
  },
  bottomContainer: {
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#893571',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 30,
    elevation: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'System',
  },
});

export default FoodContent;