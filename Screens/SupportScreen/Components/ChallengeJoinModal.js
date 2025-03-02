
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '../../../common/design';

const ChallengeJoinModal = ({ isVisible, onClose, onAccept }) => {
  const [showDonationTypeModal, setShowDonationTypeModal] = useState(false);

  const handleAccept = () => {
    setShowDonationTypeModal(true);
  };

  const handleDonationTypeSelect = (type) => {
    onAccept(type);
    setShowDonationTypeModal(false);
    onClose();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible && !showDonationTypeModal}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon name="information" size={40} color={Colors.primary} />
            <Text style={styles.modalTitle}>Join Challenge</Text>
            <Text style={styles.modalText}>
              Joining this challenge means either donating food or money for charity.
              Do you accept this commitment?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showDonationTypeModal}
        onRequestClose={() => setShowDonationTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon name="gift" size={40} color={Colors.primary} />
            <Text style={styles.modalTitle}>Choose Donation Type</Text>
            <Text style={styles.modalText}>
              Please select how you would like to contribute to this challenge:
            </Text>
            <View style={styles.donationButtonsContainer}>
              <TouchableOpacity 
                style={styles.donationButton}
                onPress={() => handleDonationTypeSelect('food')}
              >
                <Icon name="food" size={24} color="#FFFFFF" />
                <Text style={styles.donationButtonText}>Donate Food</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.donationButton}
                onPress={() => handleDonationTypeSelect('money')}
              >
                <Icon name="cash" size={24} color="#FFFFFF" />
                <Text style={styles.donationButtonText}>Donate Money</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setShowDonationTypeModal(false)}
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  acceptButton: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    ...Typography.buttonText,
    color: Colors.primary,
    textAlign: 'center',
  },
  acceptButtonText: {
    ...Typography.buttonText,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  donationButtonsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
  },
  donationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  donationButtonText: {
    ...Typography.buttonText,
    color: '#FFFFFF',
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
  },
  backButtonText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
});

export default ChallengeJoinModal;
