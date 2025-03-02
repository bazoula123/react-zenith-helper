
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../../common/design';
import styles from '../styles/Step1Style';

const Step1 = ({ onNext, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [images, setImages] = useState(initialData.images || []);
  const [activeInput, setActiveInput] = useState(null);
  const [descCharCount, setDescCharCount] = useState(description.length);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setDescCharCount(description.length);
  }, [description]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload images!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImages = [...images, result.assets[0].uri];
      if (newImages.length <= 5) {
        setImages(newImages);
      } else {
        alert('You can upload a maximum of 5 images.');
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Foundation name is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (images.length === 0) {
      newErrors.images = 'Please upload at least one image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({ name, description, images });
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <Text style={styles.sectionSubtitle}>
          Let's start with the essential details about your foundation
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Foundation Name</Text>
        <View 
          style={[
            styles.inputContainer, 
            activeInput === 'name' && styles.inputContainerActive,
            errors.name && styles.inputContainerError
          ]}
        >
          <MaterialIcons 
            name="business" 
            size={24} 
            color={activeInput === 'name' ? Colors.primary : '#666'} 
          />
          <TextInput
            style={styles.input}
            placeholder="Enter foundation name"
            value={name}
            onChangeText={setName}
            onFocus={() => setActiveInput('name')}
            onBlur={() => setActiveInput(null)}
            maxLength={50}
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <View 
          style={[
            styles.inputContainer, 
            styles.textAreaContainer,
            activeInput === 'description' && styles.inputContainerActive,
            errors.description && styles.inputContainerError
          ]}
        >
          <MaterialIcons 
            name="description" 
            size={24} 
            color={activeInput === 'description' ? Colors.primary : '#666'} 
            style={styles.textAreaIcon}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your foundation, its mission, and the impact you aim to achieve"
            value={description}
            onChangeText={setDescription}
            onFocus={() => setActiveInput('description')}
            onBlur={() => setActiveInput(null)}
            multiline
            numberOfLines={5}
            maxLength={500}
            textAlignVertical="top"
            returnKeyType="done"
          />
          <Text style={styles.charCount}>{descCharCount}/500</Text>
        </View>
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Upload Images</Text>
        <Text style={styles.imageInfo}>
          Upload up to 5 images that represent your foundation (logo, team, activities)
        </Text>
        {errors.images && <Text style={styles.errorText}>{errors.images}</Text>}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageCarousel}
        >
          {images.map((uri, index) => (
            <View key={index} style={styles.imageBox}>
              <Image source={{ uri }} style={styles.uploadedImage} />
              <TouchableOpacity
                style={styles.removeIconContainer}
                onPress={() => removeImage(index)}
              >
                <MaterialIcons name="close" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
          
          {images.length < 5 && (
            <TouchableOpacity
              style={[styles.imageBox, styles.addImageBox]}
              onPress={pickImage}
            >
              <MaterialIcons name="add-a-photo" size={40} color={Colors.primary} />
              <Text style={styles.uploadText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
        <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step1;
