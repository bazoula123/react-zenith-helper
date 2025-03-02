import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '../../../common/design';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAGGABLE_HEIGHT = SCREEN_HEIGHT * 0.7;

const CommentsModal = ({ isVisible, onClose, postId }) => {
  const [newComment, setNewComment] = useState('');
  const translateY = useRef(new Animated.Value(DRAGGABLE_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Sample comments data - in a real app, this would be filtered by postId
  const commentsData = {
    1: [
      {
        id: 1,
        user: 'Emma Thompson',
        comment: 'This is such a great initiative! Keep up the amazing work 👏',
        time: '2h ago'
      },
      {
        id: 2,
        user: 'James Wilson',
        comment: 'Thanks for sharing this. Really inspiring!',
        time: '1h ago'
      },
      {
        id: 3,
        user: 'Sarah Parker',
        comment: 'I would love to contribute to this cause.',
        time: '30m ago'
      },
      {
        id: 4,
        user: 'Michael Brown',
        comment: 'Where can I sign up to volunteer?',
        time: '15m ago'
      },
      {
        id: 5,
        user: 'Jessica Liu',
        comment: 'Our community needs more people like you!',
        time: '5m ago'
      }
    ],
    2: [
      {
        id: 6,
        user: 'David Johnson',
        comment: 'So proud of our community!',
        time: '3h ago'
      },
      {
        id: 7,
        user: 'Rachel Green',
        comment: 'I participated last week, it was amazing!',
        time: '2h ago'
      },
      {
        id: 8,
        user: 'Chris Evans',
        comment: 'Looking forward to the next food drive',
        time: '1h ago'
      }
    ]
  };

  // Get comments for the active post
  const comments = postId && commentsData[postId] ? commentsData[postId] : [];

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
          damping: 20,
          stiffness: 90
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start();
    }
  }, [isVisible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: DRAGGABLE_HEIGHT,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start(() => {
      onClose();
      setNewComment('');
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DRAGGABLE_HEIGHT * 0.3 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
            damping: 20,
            stiffness: 90
          }).start();
        }
      },
    })
  ).current;

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Here you would typically send the comment to your backend
      console.log(`New comment on post ${postId}:`, newComment);
      setNewComment('');
    }
  };

  if (!isVisible) return null;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <TouchableOpacity style={styles.overlayTouch} onPress={handleClose} activeOpacity={1}>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ translateY }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={styles.handle} />
            
            <View style={styles.header}>
              <Text style={styles.title}>Comments</Text>
              <TouchableOpacity onPress={handleClose}>
                <Icon name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.commentsContainer}>
              {comments.map(comment => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.userName}>{comment.user}</Text>
                    <Text style={styles.timeText}>{comment.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.comment}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
                maxLength={500}
              />
              <TouchableOpacity 
                style={[
                  styles.submitButton,
                  !newComment.trim() && styles.submitButtonDisabled
                ]}
                onPress={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                <Text style={styles.submitButtonText}>Comment</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouch: {
    flex: 1,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: DRAGGABLE_HEIGHT,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  commentsContainer: {
    flex: 1,
  },
  commentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
  },
  timeText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  commentText: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...Typography.bodyMedium,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CommentsModal;
