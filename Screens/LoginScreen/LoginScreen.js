import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  Animated,
  Pressable,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useClerk } from '@clerk/clerk-react';
import styles from './Style';

const CustomCheckbox = ({ value, onValueChange }) => (
  <Pressable
    style={[
      {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#b8658f',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: value ? '#b8658f' : 'transparent',
      },
    ]}
    onPress={() => onValueChange(!value)}
  >
    {value && (
      <MaterialIcons name="check" size={18} color="white" />
    )}
  </Pressable>
);

const LoginScreen = ({ navigation }) => {
  const { signOut } = useClerk();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const signOutUser = async () => {
      await signOut();
    };
    signOutUser();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in both email and password.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.11:5002/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_user: email, password_user: password }),
      });

      const result = await response.json();

      if (response.ok) {
        const userData = {
          id_user: result.user.id_user,
          email_user: result.user.email_user,
          firstname_user: result.user.firstname_user,
          lastname_user: result.user.lastname_user,
          name_user: result.user.name_user,
          image_user: result.user.image_user,
          auth_method_user: result.user.auth_method_user,
          country_user: result.user.country_user,
          created_at_user: result.user.created_at_user,
        };

        await AsyncStorage.setItem('userDataNorma', JSON.stringify(userData));
        setMethod('normal');
        navigation.replace('ScreenHome');
      } else {
        Alert.alert('Login Failed', result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'Failed to login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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

    // Add your signup logic here
  };

  const onGooglePress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        setMethod('gmail');
        navigation.replace('ScreenHome');
      }
    } catch (err) {
      console.error('OAuth Error:', err);
      Alert.alert('Authentication Error', 'Failed to sign in with Google');
    }
  }, [startOAuthFlow, navigation]);

  const switchTab = (tab) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    setTimeout(() => {
      setActiveTab(tab);
    }, 150);
  };

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#b8658f" />
        <TextInput
          placeholder={t('LoginScreen.enter_email')}
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#b8658f" />
        <TextInput
          placeholder={t('LoginScreen.enter_password')}
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#b8658f"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgetScreen')}>
        <Text style={styles.forgotPassword}>
          {t('LoginScreen.forgot_password')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? t('LoginScreen.logging_in') : t('LoginScreen.login')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignupForm = () => (
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
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#b8658f"
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
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <MaterialIcons
            name={showConfirmPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#b8658f"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <CustomCheckbox
          value={agreedToTerms}
          onValueChange={setAgreedToTerms}
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
  );

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

          <Text style={styles.title}>
            {activeTab === 'login' ? t('LoginScreen.welcome_back') : t('SignupScreen.create_account')}
          </Text>
          <Text style={styles.subtitle}>
            {activeTab === 'login' ? t('LoginScreen.login_to_continue') : t('SignupScreen.sign_up_start')}
          </Text>

          <View style={styles.loginTabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'login' && styles.activeTab]}
              onPress={() => switchTab('login')}
            >
              <Text style={[                 styles.tabText, activeTab === 'login' && styles.activeTabText]}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
                onPress={() => switchTab('signup')}
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
                <FontAwesome name="facebook" size={24} color="#4267B2" />
                <Text style={styles.socialText}> Continue with Facebook</Text>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>or continue with</Text>
                <View style={styles.divider} />
              </View>
            </View>

            <Animated.View style={{ opacity: fadeAnim }}>
              {activeTab === 'login' ? renderLoginForm() : renderSignupForm()}
            </Animated.View>

            
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
};

export default LoginScreen;

