
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '../../../common/design';

const StatsContainer = () => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Icon name="food" size={32} color={Colors.primary} />
        <Text style={styles.statNumber}>2,456</Text>
        <Text style={styles.statLabel}>Meals Shared</Text>
      </View>
      <View style={styles.statCard}>
        <Icon name="account-group" size={32} color={Colors.primary} />
        <Text style={styles.statNumber}>158</Text>
        <Text style={styles.statLabel}>Active Members</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '45%',
  },
  statNumber: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginTop: 8,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});

export default StatsContainer;
