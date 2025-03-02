
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '../../../common/design';

const LeaderboardList = ({ leaderboard }) => {
  return (
    <View style={styles.leaderboardContainer}>
      {leaderboard.map((user, index) => (
        <View key={user.id} style={styles.leaderboardItem}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>#{index + 1}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userStats}>
              {user.points} points • {user.donations} donations
            </Text>
          </View>
          <Icon name="trophy" size={24} color={index === 0 ? '#FFD700' : Colors.textSecondary} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  leaderboardContainer: {
    padding: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    ...Typography.h4,
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...Typography.bodyMedium,
    fontWeight: '600',
  },
  userStats: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
});

export default LeaderboardList;
