import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '../../../common/design';
import { useTranslation } from 'react-i18next';
const CreatePostCard = () => {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const { t } = useTranslation();
  const handleImagePick = () => {
    // Image picker functionality will be implemented here
    console.log('Pick image');
  };
  const handleCreatePost = () => {
    // Post creation logic will be implemented here
    console.log('Creating post:', { text: postText, images: selectedImages });
    setPostText('');
    setSelectedImages([]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("PostScreen.whats_in_your_mind")}
          placeholderTextColor={Colors.textSecondary}
          multiline
          value={postText}
          onChangeText={setPostText}
        />
      </View>
      
      {selectedImages.length > 0 && (
        <View style={styles.imagePreviewContainer}>
          {selectedImages.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.previewImage} />
          ))}
        </View>
      )}
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleImagePick}>
          <Icon name="image-plus" size={24} color={Colors.primary} />
          <Text style={styles.actionText}>{t("PostScreen.add_photo")}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.postButton,
            { opacity: postText.trim().length === 0 ? 0.5 : 1 }
          ]}
          onPress={handleCreatePost}
          disabled={postText.trim().length === 0}
        >
          <Text style={styles.postButtonText}>{t("PostScreen.create_post")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    ...Typography.bodyMedium,
    minHeight: 80,
    textAlignVertical: 'top',
    padding: 0,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  actionText: {
    ...Typography.labelMedium,
    color: Colors.primary,
  },
  postButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    ...Typography.labelMedium,
    color: '#FFFFFF',
  },
});
export default CreatePostCard;