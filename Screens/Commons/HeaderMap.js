
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import { Colors, Shadows } from '../../common/design';

const HeaderMap = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const navigateToNotifications = () => {
    navigation.navigate('NotificationScreen'); 
  };
  
  const navigateToProfile = () => {
    navigation.navigate('SettingsScreen');
  };

  return (
    <SafeAreaView style={[styles.header, { width }]}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={navigateToProfile} style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMBoNHTdNFu-NloeUZS5-L9aWbPTmqkCy-Tg&s' }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconContainer} onPress={navigateToNotifications}>
            <IconButton 
              icon="bell-outline" 
              size={24} 
              color={Colors.primary}
              onPress={navigateToNotifications} 
              style={styles.iconButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  profileContainer: {
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  iconButton: {
    margin: 0,
  },
});

export default HeaderMap;
