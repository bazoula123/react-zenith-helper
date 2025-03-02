
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../common/design';
import styles from '../styles/Step2Style';

const Step2 = ({ onNext, initialData = {} }) => {
  const [website, setWebsite] = useState(initialData.website || '');
  const [facebook, setFacebook] = useState(initialData.facebook || '');
  const [instagram, setInstagram] = useState(initialData.instagram || '');
  const [twitter, setTwitter] = useState(initialData.twitter || '');
  const [contactName, setContactName] = useState(initialData.contactName || '');
  const [contactEmail, setContactEmail] = useState(initialData.contactEmail || '');
  const [contactPhone, setContactPhone] = useState(initialData.contactPhone || '');
  
  const [activeInput, setActiveInput] = useState(null);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Require at least one social media link
    if (!website && !facebook && !instagram && !twitter) {
      newErrors.social = 'Please provide at least one website or social media link';
    }
    
    if (!contactName) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!contactEmail) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!validateEmail(contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        website,
        facebook,
        instagram,
        twitter,
        contactName,
        contactEmail,
        contactPhone,
      });
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media & Contact</Text>
        <Text style={styles.sectionSubtitle}>
          Help people find and connect with your foundation
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Website</Text>
        <View 
          style={[
            styles.inputContainer, 
            activeInput === 'website' && styles.inputContainerActive
          ]}
        >
          <MaterialIcons 
            name="language" 
            size={24} 
            color={activeInput === 'website' ? Colors.primary : '#666'} 
          />
          <TextInput
            style={styles.input}
            placeholder="https://your-foundation.org"
            value={website}
            onChangeText={setWebsite}
            onFocus={() => setActiveInput('website')}
            onBlur={() => setActiveInput(null)}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Social Media Links</Text>
        {errors.social && <Text style={styles.errorText}>{errors.social}</Text>}
        
        <View 
          style={[
            styles.inputContainer, 
            activeInput === 'facebook' && styles.inputContainerActive,
            { marginBottom: 12 }
          ]}
        >
          <MaterialIcons 
            name="facebook" 
            size={24} 
            color={activeInput === 'facebook' ? Colors.primary : '#666'} 
          />
          <TextInput
            style={styles.input}
            placeholder="Facebook username or page URL"
            value={facebook}
            onChangeText={setFacebook}
            onFocus={() => setActiveInput('facebook')}
            onBlur={() => setActiveInput(null)}
            autoCapitalize="none"
          />
        </View>
        
        <View 
          style={[
            styles.inputContainer, 
            activeInput === 'instagram' && styles.inputContainerActive,
            { marginBottom: 12 }
          ]}
        >
          <MaterialIcons 
            name="camera-alt" 
            size={24} 
            color={activeInput === 'instagram' ? Colors.primary : '#666'} 
          />
          <TextInput
            style={styles.input}
            placeholder="Instagram username (@yourfoundation)"
            value={instagram}
            onChangeText={setInstagram}
            onFocus={() => setActiveInput('instagram')}
            onBlur={() => setActiveInput(null)}
            autoCapitalize="none"
          />
        </View>
        
        <View 
          style={[
            styles.inputContainer, 
            activeInput === 'twitter' && styles.inputContainerActive
          ]}
        >
          <MaterialIcons 
            name="chat" 
            size={24} 
            color={activeInput === 'twitter' ? Colors.primary : '#666'} 
          />
          <TextInput
            style={styles.input}
            placeholder="Twitter/X username (@yourfoundation)"
            value={twitter}
            onChangeText={setTwitter}
            onFocus={() => setActiveInput('twitter')}
            onBlur={() => setActiveInput(null)}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contact Person</Text>
        <View 
          style={[
            styles.inputContainer, 
            activeInput === 'contactName' && styles.inputContainerActive,
            errors.contactName && styles.inputContainerError,
            { marginBottom: 12 }
          ]}
        >
          <MaterialIcons 
            name="person" 
            size={24} 
            color={activeInput === 'contactName' ? Colors.primary : '#666'} 
          />
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={contactName}
            onChangeText={setContactName}
            onFocus={() => setActiveInput('contactName')}
            onBlur={() => setActiveInput(null)}
          />
        </View>
        {errors.contactName && <Text style={styles.errorText}>{errors.contactName}</Text>}
        
        <View 
          style={[
            styles.inputContainer, 
            activeInput === 'contactEmail' && styles.inputContainerActive,
            errors.contactEmail && styles.inputContainerError,
            { marginBottom: 12 }
          ]}
        >
          <MaterialIcons 
            name="email" 
            size={24} 
            color={activeInput === 'contactEmail' ? Colors.primary : '#666'} 
          />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            value={contactEmail}
            onChangeText={setContactEmail}
            onFocus={() => setActiveInput('contactEmail')}
            onBlur={() => setActiveInput(null)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.contactEmail && <Text style={styles.errorText}>{errors.contactEmail}</Text>}
        
        <View 
          style={[
            styles.inputContainer, 
            activeInput === 'contactPhone' && styles.inputContainerActive
          ]}
        >
          <MaterialIcons 
            name="phone" 
            size={24} 
            color={activeInput === 'contactPhone' ? Colors.primary : '#666'} 
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number (optional)"
            value={contactPhone}
            onChangeText={setContactPhone}
            onFocus={() => setActiveInput('contactPhone')}
            onBlur={() => setActiveInput(null)}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
        <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step2;
