import React from 'react';
import { TouchableOpacity, View, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../common/design';

const OrderHeader = ({ navigation, title }) => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color={Colors.secondary} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    left: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 28 : 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
});

export default OrderHeader;