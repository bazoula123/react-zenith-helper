
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography, Spacing, BorderRadius } from '../../common/design';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const ChallengeCreationScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [challengeImage, setChallengeImage] = useState(null);
  const [rewards, setRewards] = useState(['']);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddReward = () => {
    setRewards([...rewards, '']);
  };

  const handleRemoveReward = (index) => {
    const newRewards = [...rewards];
    newRewards.splice(index, 1);
    setRewards(newRewards);
  };

  const handleRewardChange = (text, index) => {
    const newRewards = [...rewards];
    newRewards[index] = text;
    setRewards(newRewards);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setChallengeImage(result.uri || result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!title.trim()) {
      Alert.alert('Missing information', 'Please enter a challenge title');
      return;
    }

    if (!goal.trim()) {
      Alert.alert('Missing information', 'Please enter a goal number of meals');
      return;
    }

    if (!challengeImage) {
      Alert.alert('Missing image', 'Please upload a challenge image');
      return;
    }

    // Create challenge object
    const newChallenge = {
      title,
      description,
      goal: parseInt(goal),
      endDate,
      image: challengeImage,
      rewards: rewards.filter(reward => reward.trim() !== ''),
      progress: 0,
      participants: 0,
    };

    console.log('New challenge created:', newChallenge);
    
    // Navigate back to Support Screen
    Alert.alert(
      'Challenge Created!',
      'Your challenge has been successfully created.',
      [{ text: 'OK', onPress: () => navigation.navigate('SupportScreen') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Challenge</Text>
        <View style={{ width: 40 }} /> {/* Empty view for header alignment */}
      </View>


      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Icon name="trophy" size={24} color={Colors.primary} />
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Active Challenges</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="account-group" size={24} color={Colors.primary} />
              <Text style={styles.statNumber}>73</Text>
              <Text style={styles.statLabel}>Participants</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            {/* Challenge Image */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Challenge Image</Text>
              <TouchableOpacity onPress={pickImage} style={styles.imageUploadContainer}>
                {challengeImage ? (
                  <Image source={{ uri: challengeImage }} style={styles.uploadedImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Icon name="camera" size={40} color={Colors.primary} />
                    <Text style={styles.imagePlaceholderText}>Upload Image</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.helperText}>
                Upload an inspiring image for your challenge
              </Text>
            </View>

            {/* Challenge Title */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Challenge Title</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter a catchy title for your challenge"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#999"
              />
            </View>

            {/* Challenge Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Describe your challenge and motivate others to join"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="#999"
              />
            </View>

            {/* Challenge Goal */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Meal Goal</Text>
              <View style={styles.inputWithIcon}>
                <Icon name="food" size={24} color={Colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { paddingLeft: 40 }]}
                  placeholder="Number of meals to reach"
                  value={goal}
                  onChangeText={setGoal}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* End Date */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>End Date</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Icon name="calendar" size={24} color={Colors.primary} style={styles.dateIcon} />
                <Text style={styles.dateText}>
                  {endDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
                <Icon name="chevron-down" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            {/* Rewards */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rewards</Text>
              <Text style={styles.helperText}>
                Add rewards that participants will earn by completing this challenge
              </Text>

              {rewards.map((reward, index) => (
                <View key={index} style={styles.rewardRow}>
                  <View style={styles.inputWithIcon}>
                    <Icon name="trophy" size={20} color={Colors.highlight} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, { paddingLeft: 40, flex: 1 }]}
                      placeholder="Enter reward"
                      value={reward}
                      onChangeText={(text) => handleRewardChange(text, index)}
                      placeholderTextColor="#999"
                    />
                  </View>
                  
                  {rewards.length > 1 && (
                    <TouchableOpacity 
                      onPress={() => handleRemoveReward(index)}
                      style={styles.removeButton}
                    >
                      <Icon name="close-circle" size={24} color={Colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity 
                style={styles.addRewardButton}
                onPress={handleAddReward}
              >
                <Icon name="plus-circle" size={20} color={Colors.primary} />
                <Text style={styles.addRewardText}>Add Another Reward</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Icon name="check-circle" size={24} color="#FFFFFF" />
        <Text style={styles.submitButtonText}>Create Challenge</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...Typography.h3,
    marginLeft: 16,
  },
  banner: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  bannerSubText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    marginBottom: 0,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '45%',
  },
  statNumber: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
    backgroundColor: Colors.lightPurple,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    ...Typography.labelLarge,
    color: Colors.primary,
    marginBottom: 10,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  helperText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginVertical: 8,
  },
  imageUploadContainer: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
  },
  imagePlaceholder: {
    backgroundColor: 'rgba(137, 53, 113, 0.05)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    ...Typography.labelMedium,
    color: Colors.primary,
    marginTop: 8,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
  },
  dateIcon: {
    marginRight: 10,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  inputWithIcon: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeButton: {
    marginLeft: 8,
    padding: 4,
  },
  addRewardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
  },
  addRewardText: {
    marginLeft: 8,
    color: Colors.primary,
    fontWeight: '500',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 8,
  },
  submitButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChallengeCreationScreen;