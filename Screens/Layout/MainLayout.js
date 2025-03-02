
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Commons/Header';
import FooterNavigator from '../FooterNavigator/FooterNavigator';
import { useRoute } from '@react-navigation/native';

const MainLayout = ({ children }) => {
  const route = useRoute();
  const isMapScreen = route.name === 'MapScreen';
  
  // For MapScreen, we don't want to show the header
  // as it has its own header (HeaderMap)
  return (
    <SafeAreaView style={styles.container}>
      {!isMapScreen && <Header />}
      <View style={styles.content}>
        {children}
      </View>
      {!isMapScreen && <FooterNavigator />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});

export default MainLayout;
