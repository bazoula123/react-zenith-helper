
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '../../../common/design';

const ActionButton = ({ onPress, selectedTab }) => {
  return (
    <TouchableOpacity 
      style={styles.createChallengeButton}
      onPress={onPress}
    >
      <Icon name="plus" size={24} color="#FFFFFF" />
      <Text style={styles.createChallengeText}>
        {selectedTab === 'challenges' ? 'Create New Challenge' : 'Invite Friends'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createChallengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  createChallengeText: {
    ...Typography.buttonText,
    color: '#FFFFFF',
  },
});

export default ActionButton;
