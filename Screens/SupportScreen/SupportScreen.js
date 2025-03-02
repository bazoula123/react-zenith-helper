
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import refactored components
import Header from './Components/Header';
import StatsContainer from './Components/StatsContainer';
import TabSelector from './Components/TabSelector';
import ChallengesList from './Components/ChallengesList';
import LeaderboardList from './Components/LeaderboardList';
import ActionButton from './Components/ActionButton';
import ChallengeJoinModal from './Components/ChallengeJoinModal';

const SupportScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('challenges');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const [challenges] = useState([
    {
      id: 1,
      title: "Let's reach 1000 donated meals this month!",
      progress: 680,
      goal: 1000,
      participants: 45,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop',
      deadline: '2024-03-30',
      rewards: ['Community Badge', '500 Points', 'Featured Donor Status'],
    },
    {
      id: 2,
      title: 'Zero Food Waste Challenge',
      progress: 230,
      goal: 500,
      participants: 28,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
      deadline: '2024-03-15',
      rewards: ['Eco Warrior Badge', '300 Points', 'Special Profile Frame'],
    },
  ]);

  const [leaderboard] = useState([
    { id: 1, name: 'Sarah Johnson', points: 1250, donations: 42 },
    { id: 2, name: 'Mike Chen', points: 980, donations: 35 },
    { id: 3, name: 'Emma Davis', points: 750, donations: 28 },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleJoinChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setShowJoinModal(true);
  };

  const handleDonationAccept = (donationType) => {
    if (donationType === 'food') {
      navigation.navigate('DonateScreen');
    } else {
      console.log('Navigate to money donation screen');
    }
  };

  const handleCreateChallenge = () => {
    navigation.navigate('ChallengeCreationScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={handleBack} title="Community Hub" />
      
      <StatsContainer />
      
      <TabSelector 
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab} 
      />

      <ScrollView style={styles.scrollView}>
        {selectedTab === 'challenges' ? (
          <ChallengesList 
            challenges={challenges} 
            handleJoinChallenge={handleJoinChallenge} 
          />
        ) : (
          <LeaderboardList leaderboard={leaderboard} />
        )}
      </ScrollView>

      <ActionButton 
        onPress={handleCreateChallenge} 
        selectedTab={selectedTab} 
      />

      <ChallengeJoinModal
        isVisible={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onAccept={handleDonationAccept}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
});

export default SupportScreen;
