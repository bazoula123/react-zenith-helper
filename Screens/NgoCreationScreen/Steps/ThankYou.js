
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography } from '../../../common/design';

const ThankYou = ({ navigation }) => {
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [opacityAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate the success message
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoToHome = () => {
    navigation.navigate('NgoFindScreen');
  };

  const handleViewFoundation = () => {
    // Navigate to the foundation details screen
    // For now, we'll just go back to the NGO find screen
    navigation.navigate('NgoFindScreen');
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.successContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.iconCircle}>
          <MaterialIcons name="check" size={56} color="white" />
        </View>
        
        <Text style={styles.successTitle}>Registration Successful!</Text>
        
        <Text style={styles.successMessage}>
          Your foundation has been successfully registered. Our team will review your 
          submission and it will be live within 24-48 hours.
        </Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MaterialIcons name="info" size={24} color={Colors.primary} />
            <Text style={styles.infoText}>
              You'll receive a confirmation email with next steps
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="edit" size={24} color={Colors.primary} />
            <Text style={styles.infoText}>
              You can edit your foundation details from your profile
            </Text>
          </View>
        </View>
      </Animated.View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleViewFoundation}
        >
          <Text style={styles.primaryButtonText}>View My Foundation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleGoToHome}
        >
          <Text style={styles.secondaryButtonText}>Back to Foundations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  successTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    marginLeft: 12,
    flex: 1,
  },
  buttonsContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ThankYou;
