
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import * as RootNavigation from '../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScreenHome() {
  const { user, isLoaded: clerkLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [dotCount, setDotCount] = useState(1);

  // Animate the "..." in "Authenticating..."
  useEffect(() => {
    const dotAnimation = setInterval(() => {
      setDotCount(prevCount => (prevCount % 3) + 1);
    }, 500);

    return () => clearInterval(dotAnimation);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check AsyncStorage for normal login
        const normalUserData = await AsyncStorage.getItem('userDataNorma');
        
        if (normalUserData) {
          console.log('Normal auth user found:', normalUserData);
          setTimeout(() => {
            if (RootNavigation.navigationRef.isReady()) {
              RootNavigation.navigate('HomeScreen');
            }
            setIsLoading(false);
          }, 1000);
          return;
        }

        // If no normal auth, check Clerk auth
        if (clerkLoaded && user?.primaryEmailAddress?.emailAddress) {
          const response = await fetch('http://192.168.1.81:5002/api/check-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email_user: user.primaryEmailAddress.emailAddress 
            }),
          });

          const result = await response.json();
          console.log('Clerk user check result:', result);
          
          setTimeout(() => {
            if (RootNavigation.navigationRef.isReady()) {
              if (result.exists) {
                RootNavigation.navigate('HomeScreen');
              } else {
                RootNavigation.navigate('SignUpGmail');
              }
            }
            setIsLoading(false);
          }, 1000);
        } else if (clerkLoaded && !user) {
          // If Clerk has loaded but no user is found, and no normal auth
          setTimeout(() => {
            if (RootNavigation.navigationRef.isReady()) {
              RootNavigation.navigate('StartScreen');
            }
            setIsLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoading(false);
        if (RootNavigation.navigationRef.isReady()) {
          RootNavigation.navigate('StartScreen');
        }
      }
    };

    checkAuth();
  }, [user, clerkLoaded]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" animating={isLoading} />
          <Text style={styles.authText}>
            Authenticating{'.'.repeat(dotCount)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#893571',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  authText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
