import React, { useState, useRef, useEffect } from 'react';
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius } from '../../common/design';
import { useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../RootNavigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const steps = [
  {
    title: "Share With Love",
    description: "Join a community that believes in sharing meals and spreading joy",
  },
  {
    title: "Make an Impact",
    description: "Every meal shared is a step towards reducing food waste",
  },
  {
    title: "Connect & Care",
    description: "Build meaningful connections through the power of food sharing",
  }
];

const foodItems = [
  {
    id: 1,
    image: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
    backgroundColor: '#E5DEFF',
    size: SCREEN_WIDTH * 0.22,
  },
  {
    id: 2,
    image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
    backgroundColor: '#FFDEE2',
    size: SCREEN_WIDTH * 0.28,
  },
  {
    id: 3,
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    backgroundColor: '#FDE1D3',
    size: SCREEN_WIDTH * 0.25,
  },
  {
    id: 4,
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    backgroundColor: '#D3E4FD',
    size: SCREEN_WIDTH * 0.2,
  },
  {
    id: 5,
    image: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
    backgroundColor: '#FEC6A1',
    size: SCREEN_WIDTH * 0.24,
  },
  {
    id: 6,
    image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
    backgroundColor: '#F2FCE2',
    size: SCREEN_WIDTH * 0.26,
  },
  {
    id: 7,
    image: 'https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg',
    backgroundColor: '#FEF7CD',
    size: SCREEN_WIDTH * 0.23,
  }
];

const generateRandomPosition = () => ({
  x: Math.random() * (SCREEN_WIDTH - SCREEN_WIDTH * 0.3),
  y: Math.random() * (SCREEN_HEIGHT * 0.25)
});

export default function StartScreen({ navigation }) {
  const [activeStep, setActiveStep] = useState(0);
  const [positions, setPositions] = useState(foodItems.map(() => generateRandomPosition()));
  const [showStartScreen, setShowStartScreen] = useState(false);
  const { user, isLoaded: clerkLoaded } = useUser();
  const animatedValues = useRef(foodItems.map(() => ({
    scale: new Animated.Value(0),
    translateX: new Animated.Value(0),
    translateY: new Animated.Value(0)
  }))).current;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const normalUserData = await AsyncStorage.getItem('userDataNorma');
        
        if (normalUserData) {
          console.log('Normal auth user found:', normalUserData);
          if (RootNavigation.navigationRef.isReady()) {
            RootNavigation.navigate('HomeScreen');
          }
          return;
        }

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
          
          if (RootNavigation.navigationRef.isReady()) {
            if (result.exists) {
              RootNavigation.navigate('HomeScreen');
            } else {
              RootNavigation.navigate('SignUpGmail');
            }
          }
        } else if (clerkLoaded && !user) {
          setShowStartScreen(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setShowStartScreen(true);
      }
    };

    checkAuth();
  }, [user, clerkLoaded]);

  useEffect(() => {
    animateBubbles(activeStep);
  }, []);

  const animateBubbles = (nextStep) => {
    setActiveStep(nextStep);
    const newPositions = foodItems.map(() => generateRandomPosition());
    setPositions(newPositions);

    animatedValues.forEach((anim) => {
      Animated.parallel([
        Animated.spring(anim.scale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }),
        Animated.spring(anim.translateX, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }),
        Animated.spring(anim.translateY, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        })
      ]).start(() => {
        anim.scale.setValue(0);
        anim.translateX.setValue(0);
        anim.translateY.setValue(0);
      });
    });
  };

  const renderFoodBubbles = () => {
    return foodItems.map((item, index) => {
      const scale = animatedValues[index].scale.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.2, 1]
      });

      const translateX = animatedValues[index].translateX.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.random() * 60 - 30]
      });

      const translateY = animatedValues[index].translateY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.random() * 60 - 30]
      });

      return (
        <Animated.View
          key={item.id}
          style={[
            styles.foodBubble,
            {
              width: item.size,
              height: item.size,
              backgroundColor: item.backgroundColor,
              left: positions[index].x,
              top: positions[index].y,
              transform: [
                { scale },
                { translateX },
                { translateY }
              ]
            }
          ]}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.foodImage}
            resizeMode="cover"
          />
        </Animated.View>
      );
    });
  };

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepDot,
              {
                backgroundColor: index === activeStep ? Colors.primary : Colors.border,
                width: index === activeStep ? 24 : 8,
              }
            ]}
          />
        ))}
      </View>
    );
  };

  if (!showStartScreen) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#fafafa']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.logoText}>FOODECA</Text>
        </View>

        <View style={styles.bubblesContainer}>
          {renderFoodBubbles()}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{steps[activeStep].title}</Text>
            <Text style={styles.description}>{steps[activeStep].description}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {renderStepIndicator()}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (activeStep < steps.length - 1) {
                animateBubbles(activeStep + 1);
              } else {
                navigation.navigate('Login');
              }
            }}
          >
            <Text style={styles.buttonText}>
              {activeStep < steps.length - 1 ? 'Next' : 'Get started'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    paddingTop: Spacing.xl,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
  },
  bubblesContainer: {
    height: SCREEN_HEIGHT * 0.3,
    position: 'relative',
    marginTop: Spacing.md,
    zIndex: 1,
  },
  foodBubble: {
    position: 'absolute',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    opacity: 0.9,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Spacing.xl * 2,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
  buttonContainer: {
    paddingBottom: Spacing.xl * 2,
    zIndex: 2,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  stepDot: {
    height: 8,
    borderRadius: BorderRadius.round,
    marginHorizontal: 4,
    transition: '0.3s',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#893571',
  }
});
