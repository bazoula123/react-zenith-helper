
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing } from '../../common/design';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import ThankYou from './Steps/ThankYou';

const { width, height } = Dimensions.get('window');

const NgoCreationScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleNext = (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission logic would go here
      setCurrentStep(4); // Thank you screen
    }
  };

  const handleContinue = () => {
    // Get the step component to trigger its validation/submission
    const stepRefs = {
      1: step1Ref,
      2: step2Ref,
      3: step3Ref
    };
    
    if (currentStep <= 3 && stepRefs[currentStep]?.current?.handleSubmit) {
      stepRefs[currentStep].current.handleSubmit();
    } else if (currentStep === 4) {
      navigation.navigate('HomeScreen');
    }
  };

  // References to step components for triggering their submission methods
  const step1Ref = React.useRef(null);
  const step2Ref = React.useRef(null);
  const step3Ref = React.useRef(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Create Foundation</Text>
            <Text style={styles.headerSubtitle}>
              {currentStep === 4 ? 'Registration Complete' : `Step ${currentStep} of 3`}
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </LinearGradient>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {currentStep === 1 && <Step1 ref={step1Ref} onNext={handleNext} initialData={formData} />}
            {currentStep === 2 && <Step2 ref={step2Ref} onNext={handleNext} initialData={formData} />}
            {currentStep === 3 && <Step3 ref={step3Ref} onNext={handleNext} initialData={formData} />}
            {currentStep === 4 && <ThankYou navigation={navigation} />}
          </View>

          {currentStep < 4 && (
            <View style={styles.footerButton}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleContinue}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                  <MaterialIcons name="arrow-forward" size={24} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDE7F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom: 18,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minHeight: height * 0.6,
  },
  footerButton: {
    marginTop: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default NgoCreationScreen;
