
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Shadows } from '../../../common/design';
import ChallengeJoinModal from '../../SupportScreen/Components/ChallengeJoinModal';

const ChallengeFeed = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const challenges = [
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
  ];

  const handleViewAll = () => {
    navigation.navigate('SupportScreen');
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

  const renderProgressBar = (progress, goal) => {
    const percentage = (progress / goal) * 100;
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('CommunityActions.Challenges')}</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAll}>{t('CommunityActions.ViewAll')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {challenges.map((challenge) => (
          <View key={challenge.id} style={styles.challengeCard}>
            <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
            <View style={styles.challengeContent}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <View style={styles.progressSection}>
                <Text style={styles.progressText}>
                  {challenge.progress} / {challenge.goal} meals
                </Text>
                {renderProgressBar(challenge.progress, challenge.goal)}
              </View>
              <View style={styles.challengeDetails}>
                <View style={styles.detailItem}>
                  <Icon name="account-group" size={20} color={Colors.textSecondary} />
                  <Text style={styles.detailText}>{challenge.participants} participants</Text>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="calendar" size={20} color={Colors.textSecondary} />
                  <Text style={styles.detailText}>Ends: {challenge.deadline}</Text>
                </View>
              </View>
              <View style={styles.rewardsContainer}>
                <Text style={styles.rewardsTitle}>Rewards:</Text>
                {challenge.rewards.map((reward, index) => (
                  <View key={index} style={styles.rewardItem}>
                    <Icon name="star" size={16} color={Colors.highlight} />
                    <Text style={styles.rewardText}>{reward}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity 
                style={styles.joinButton}
                onPress={() => handleJoinChallenge(challenge)}
              >
                <Text style={styles.joinButtonText}>Join Challenge</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <ChallengeJoinModal
        isVisible={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onAccept={handleDonationAccept}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
  },
  scrollContent: {
    padding: 16,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  challengeImage: {
    width: '100%',
    height: 160,
  },
  challengeContent: {
    padding: 16,
  },
  challengeTitle: {
    ...Typography.h4,
    marginBottom: 12,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  challengeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  rewardsContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  rewardsTitle: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    marginBottom: 8,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rewardText: {
    ...Typography.bodySmall,
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    ...Typography.buttonText,
    color: '#FFFFFF',
  },
});

export default ChallengeFeed;
