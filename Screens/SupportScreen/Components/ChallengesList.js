
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '../../../common/design';

const ChallengesList = ({ challenges, handleJoinChallenge }) => {
  const renderProgressBar = (progress, goal) => {
    const percentage = (progress / goal) * 100;
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
    );
  };

  return (
    <View style={styles.challengesContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  challengesContainer: {
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

export default ChallengesList;
