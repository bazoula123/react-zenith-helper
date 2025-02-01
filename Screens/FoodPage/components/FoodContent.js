import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const FoodContent = ({ foodData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{foodData.name_food}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{foodData.type_food}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="time-outline" size={20} color="#7792bd" />
            <Text style={styles.statText}>
              {foodData.availability.time_availability}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="star-outline" size={20} color="#7792bd" />
            <Text style={styles.statText}>4.6</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="location-outline" size={20} color="#7792bd" />
            <Text style={styles.statText}>{foodData.availability.country_availability}</Text>
          </View>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {foodData.description_food}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Icon name="restaurant-outline" size={24} color="#7792bd" />
          <Text style={styles.infoText}>
            {foodData.quantity_food} {foodData.quantitytype_food} available
          </Text>
        </View>
        {foodData.hallal_food === 1 && (
          <View style={styles.infoRow}>
            <Icon name="checkmark-circle-outline" size={24} color="#4CAF50" />
            <Text style={styles.infoText}>Halal Certified</Text>
          </View>
        )}
        {foodData.allergens_food === "true" && (
          <View style={styles.infoRow}>
            <Icon name="warning-outline" size={24} color="#FF9800" />
            <Text style={styles.infoText}>Contains Allergens</Text>
          </View>
        )}
      </View>

      <View style={styles.locationSection}>
        <Text style={styles.sectionTitle}>Pickup Location</Text>
        <View style={styles.locationCard}>
          <Icon name="location" size={24} color="#7792bd" />
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>
              {foodData.availability.adresse_availability}
            </Text>
            <Text style={styles.locationSubtext}>
              {foodData.availability.postalcode_availability}, {foodData.availability.country_availability}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.requestButton}>
        <LinearGradient
          colors={['#7792bd', '#5c7cb3']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Request Food</Text>
          <Icon name="arrow-forward" size={24} color="#FFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerSection: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  typeContainer: {
    backgroundColor: '#7792bd20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: '#7792bd',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#444',
  },
  locationSection: {
    marginBottom: 24,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
  },
  locationDetails: {
    marginLeft: 12,
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  locationSubtext: {
    fontSize: 14,
    color: '#666',
  },
  requestButton: {
    marginVertical: 24,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#7792bd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default FoodContent;