
import React, { useState, useCallback } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import SuccessModal from '../../common/SuccessModal';
import styles from '../LoginScreen/Style';
import { signupUser } from './services/signupService';
import Checkbox from '@react-native-community/checkbox';

const SignupScreen = ({ navigation }) => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { t } = useTranslation();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('signup');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignup = async () => {
    if (!agreedToTerms) {
      Alert.alert('Agreement Required', 'Please agree to the terms and conditions to continue.');
      return;
    }

    if (!email || !password || !firstname || !lastname) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    try {
      await signupUser({
        email,
        firstname,
        lastname,
        password,
        country: 'United States', // Default country
      });
      setIsModalVisible(true);
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred during signup');
    }
  };

  const onGooglePress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        navigation.replace('ScreenHome');
      }
    } catch (err) {
      console.error('OAuth Error:', err);
      Alert.alert('Authentication Error', 'Failed to sign in with Google');
    }
  }, [startOAuthFlow, navigation]);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          </View>

          <Text style={styles.title}>{t('SignupScreen.create_account')}</Text>
          <Text style={styles.subtitle}>{t('SignupScreen.sign_up_start')}</Text>

          <View style={styles.loginTabs}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'login' && styles.activeTab]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
              onPress={() => setActiveTab('signup')}
            >
              <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={onGooglePress}>
              <FontAwesome name="google" size={24} color="#893571" />
              <Text style={styles.socialText}> Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={24} color="#000000" />
              <Text style={styles.socialText}> Continue with Apple</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or continue with</Text>
              <View style={styles.divider} />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color="#b8658f" />
              <TextInput
                placeholder={t('SignupScreen.first_name')}
                style={styles.input}
                value={firstname}
                onChangeText={setFirstname}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color="#b8658f" />
              <TextInput
                placeholder={t('SignupScreen.last_name')}
                style={styles.input}
                value={lastname}
                onChangeText={setLastname}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={24} color="#b8658f" />
              <TextInput
                placeholder={t('SignupScreen.email')}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="#b8658f" />
              <TextInput
                placeholder={t('SignupScreen.password')}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <MaterialIcons
                  name={isPasswordVisible ? "visibility" : "visibility-off"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="#b8658f" />
              <TextInput
                placeholder={t('SignupScreen.confirm_password')}
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                <MaterialIcons
                  name={isConfirmPasswordVisible ? "visibility" : "visibility-off"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                value={agreedToTerms}
                onValueChange={setAgreedToTerms}
                tintColors={{ true: '#b8658f', false: '#666' }}
              />
              <Text style={styles.checkboxLabel}>
                By agreeing to the terms and conditions, you are entering into a legally binding contract with the service provider.
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, !agreedToTerms && styles.disabledButton]}
              onPress={handleSignup}
              disabled={!agreedToTerms}
            >
              <Text style={styles.loginButtonText}>
                {t('SignupScreen.sign_up_button')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <SuccessModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          navigation.navigate('Login');
        }}
        message="Thank you for joining our community!"
      />
    </SafeAreaView>
  );
};

export default SignupScreen;
