
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import SignupScreen from '../Screens/SignupScreen/SignupScreen';
import ForgetScreen from '../Screens/ForgetScreen/ForgetScreen';
import StartScreen from '../Screens/StartScreen/StartScreen';
import SignUpGmail from '../Screens/ContinueSignupScreen/SignUpGmail';
import ScreenHome from '../Screens/ScreenHome';
import NotificationScreen from '../Screens/NotificationScreen/NotificationScreen';
import DonateScreen from '../Screens/DonateFood/DonateScreen';
import NgoFindScreen from '../Screens/FindNgoScreen/NgoFindScreen';
import FoodDetail from '../Screens/FoodPage/FoodDetail';
import NGODetail from '../Screens/NgoPage/NGODetail';
import StoreSceen from '../Screens/Store/StoreScreen';
import AdressPickerScreen from '../Screens/AdressPickerScreen/AdressPickerScreen';
import OrderFood from '../Screens/FoodPage/OrderFood';
import HistoryScreen from '../Screens/HistoryScreen/HistoryScreen';
import RewardScreen from '../Screens/RewardScreen/RewardScreen';
import PostScreen from '../Screens/PostScreen/PostScreen';
import SupportScreen from '../Screens/SupportScreen/SupportScreen';
import MainLayout from '../Screens/Layout/MainLayout';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import MapScreen from '../Screens/MapScreen/MapScreen';
import CommunityScreen from '../Screens/CommunityScreen/CommunityScreen';
import SettingsScreen from '../Screens/SettingsScreen/SettingsScreen';
import StatsScreen from '../Screens/StatsScreen/StatsScreen';
import FoundationDetailScreen from '../Screens/FoundationDetailScreen/FoundationDetailScreen';
import NgoCreationScreen from '../Screens/NgoCreationScreen/NgoCreationScreen';
import SearchScreen from '../Screens/SearchScreen/SearchScreen';
import ChallengeCreationScreen from '../Screens/SupportScreen/ChallengeCreationScreen';

const Stack = createStackNavigator();

const withMainLayout = (Component) => {
  return (props) => (
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  );
};

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Disable gestures globally
        cardStyle: { backgroundColor: '#fff' }, // Set a default background color
        presentation: 'card', // Use card presentation instead of modal
        animationEnabled: true, // Keep animations but remove gestures
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress, // Simple fade transition
          },
        }),
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
      <Stack.Screen name="SignUpGmail" component={SignUpGmail} />
      <Stack.Screen name="ScreenHome" component={ScreenHome} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="DonateScreen" component={DonateScreen} />
      <Stack.Screen name="NgoFindScreen" component={NgoFindScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
      <Stack.Screen name="NGODetail" component={NGODetail} />
      <Stack.Screen name="FoundationDetailScreen" component={FoundationDetailScreen} />
      <Stack.Screen name="StoreScreen" component={StoreSceen} />
      <Stack.Screen name="AdressPickerScreen" component={AdressPickerScreen} />
      <Stack.Screen name="OrderFood" component={OrderFood} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="RewardScreen" component={RewardScreen} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="NgoCreationScreen" component={NgoCreationScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ChallengeCreationScreen" component={ChallengeCreationScreen} />
      
      <Stack.Screen name="HomeScreen" component={withMainLayout(HomeScreen)} />
      <Stack.Screen name="MapScreen" component={withMainLayout(MapScreen)} />
      <Stack.Screen name="CommunityScreen" component={withMainLayout(CommunityScreen)} />
      <Stack.Screen name="SettingsScreen" component={withMainLayout(SettingsScreen)} />
      <Stack.Screen name="StatsScreen" component={withMainLayout(StatsScreen)} />
    </Stack.Navigator>
  );
}
