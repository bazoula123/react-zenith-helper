import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { IconButton, Searchbar, Surface } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../common/design';

const Header = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
          setUserName(fullName || 'User');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserName('User');
      }
    };

    getUserData();
  }, []);

  const navigateToNotifications = () => {
    navigation.navigate('NotificationScreen');
  };

  const navigateToRewards = () => {
    navigation.navigate('RewardScreen');
  };
  
  const navigateToSearch = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <Surface style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F8F9FA']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.userInfo}>
            <View style={styles.profileContainer}>
            <TouchableOpacity onPress={navigateToRewards}>
              <Surface style={styles.profilePicContainer}>
                <Image
                  source={{ 
                    uri: 'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' 
                  }}
                  style={styles.profilePic}
                />
              </Surface>
              <View style={styles.trophyIconContainer}>
                <Icon name="trophy" size={13} color="#FFFFFF" />
              </View>
              </TouchableOpacity>
            </View>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{t('Header.good_morning')}</Text>
              <Text style={styles.username}>Iheb Chebbi</Text>
            </View>
          </View>
          
          <View style={styles.headerIcons}>
            <View style={styles.iconContainer}>
              <View style={styles.notificationWrapper}>
                <IconButton
                  icon="bell-outline"
                  size={24}
                  style={styles.iconButton}
                  onPress={navigateToNotifications}
                  rippleColor="rgba(137, 53, 113, 0.1)"
                />
                <View style={styles.notificationDot} />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={navigateToSearch} activeOpacity={0.7}>
          <Searchbar
            placeholder={t('Header.search_placeholder')}
            value={searchQuery}
            style={styles.searchBar}
            iconColor={Colors.primary}
            placeholderTextColor="#757575"
            inputStyle={styles.searchInput}
            onFocus={navigateToSearch}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </LinearGradient>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    borderTopWidth: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicContainer: {
    elevation: 3,
    borderRadius: 25,
    marginRight: 12,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'System',
    letterSpacing: 0.25,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    letterSpacing: 0.15,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  iconButton: {
    margin: 0,
    backgroundColor: 'transparent',
  },
  notificationWrapper: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  searchBar: {
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    elevation: 0,
    height: 48,
    marginTop: 4,
  },
  searchInput: {
    fontSize: 16,
    color: '#212121',
    paddingLeft: 4,
  },
  
  profileContainer: {
    position: 'relative',
  },
  trophyIconContainer: {
    position: 'absolute',
    bottom: -5,
    right: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Header;