
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../common/design';

const TabSelector = ({ selectedTab, setSelectedTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tab, selectedTab === 'challenges' && styles.activeTab]}
        onPress={() => setSelectedTab('challenges')}
      >
        <Text style={[styles.tabText, selectedTab === 'challenges' && styles.activeTabText]}>
          Challenges
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, selectedTab === 'leaderboard' && styles.activeTab]}
        onPress={() => setSelectedTab('leaderboard')}
      >
        <Text style={[styles.tabText, selectedTab === 'leaderboard' && styles.activeTabText]}>
          Leaderboard
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default TabSelector;
