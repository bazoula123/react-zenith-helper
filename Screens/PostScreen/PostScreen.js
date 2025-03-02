
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../Commons/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Shadows } from '../../common/design';
import CommentsModal from './Components/CommentsModal';
import CreatePostCard from './Components/CreatePostCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostScreen = () => {
  const navigation = useNavigation();
  const [showComments, setShowComments] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [newComment, setNewComment] = useState('');

  const posts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      content: 'Just donated some fresh produce to our local food bank! Every little bit helps 💚 #FoodSustainability',
      timestamp: '2h ago',
      likes: 42,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
      previewComments: [
        {
          id: 101,
          user: 'Emma Thompson',
          comment: 'This is so inspiring! Ill do the same this weekend.',
          time: '1h ago'
        },
        {
          id: 102,
          user: 'James Wilson',
          comment: 'The local food bank is always grateful for fresh produce!',
          time: '30m ago'
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      content: 'Proud to be part of a community that cares. Together we can make a difference in reducing food waste!',
      timestamp: '4h ago',
      likes: 31,
      comments: 5,
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop',
      previewComments: [
        {
          id: 201,
          user: 'Lisa Parker',
          comment: 'Such a positive message! Keep it up 👏',
          time: '2h ago'
        },
        {
          id: 202,
          user: 'David Brown',
          comment: 'Our community is the best!',
          time: '1h ago'
        }
      ]
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOpenComments = (postId) => {
    setActivePostId(postId);
    setShowComments(true);
  };

  const handleCommentSubmit = (postId) => {
    if (newComment.trim()) {
      console.log(`New comment on post ${postId}: ${newComment}`);
      // Here you would typically send the comment to your backend
      setNewComment('');
      // Open the full comments modal
      handleOpenComments(postId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Posts</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <CreatePostCard />
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
              <View style={styles.postHeaderText}>
                <Text style={styles.userName}>{post.user.name}</Text>
                <Text style={styles.timestamp}>{post.timestamp}</Text>
              </View>
            </View>
            
            <Text style={styles.content}>{post.content}</Text>
            
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="heart-outline" size={24} color={Colors.primary} />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleOpenComments(post.id)}
              >
                <Icon name="comment-outline" size={24} color={Colors.primary} />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
            </View>

            {/* Preview Comments Section */}
            {post.previewComments && post.previewComments.length > 0 && (
              <View style={styles.previewCommentsContainer}>
                {post.previewComments.map(comment => (
                  <View key={comment.id} style={styles.previewCommentItem}>
                    <Text style={styles.commentUserName}>{comment.user}</Text>
                    <Text style={styles.commentText}>{comment.comment}</Text>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                  </View>
                ))}
                {post.comments > 2 && (
                  <TouchableOpacity 
                    onPress={() => handleOpenComments(post.id)}
                    style={styles.viewAllCommentsButton}
                  >
                    <Text style={styles.viewAllCommentsText}>
                      View all {post.comments} comments
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Comment Input Field */}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
                onFocus={() => handleOpenComments(post.id)}
              />
              <TouchableOpacity 
                style={styles.commentSubmitButton}
                onPress={() => handleCommentSubmit(post.id)}
                disabled={!newComment.trim()}
              >
                <Icon 
                  name="send" 
                  size={20} 
                  color={newComment.trim() ? Colors.primary : Colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <CommentsModal 
        isVisible={showComments}
        onClose={() => setShowComments(false)}
        postId={activePostId}
      />
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
  scrollView: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    ...Shadows.small,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postHeaderText: {
    marginLeft: 12,
  },
  userName: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
  },
  timestamp: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  content: {
    ...Typography.bodyMedium,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 24,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  previewCommentsContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
  },
  previewCommentItem: {
    marginBottom: 8,
    padding: 4,
  },
  commentUserName: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
  },
  commentText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
  commentTime: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  viewAllCommentsButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  viewAllCommentsText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  commentInput: {
    flex: 1,
    height: 36,
    ...Typography.bodySmall,
  },
  commentSubmitButton: {
    padding: 8,
  },
});

export default PostScreen;
