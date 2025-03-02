
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Shadows } from '../../../common/design';

export default function Cards4() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePostPress = () => {
    navigation.navigate('PostScreen');
  };

  const handleSupportPress = () => {
    navigation.navigate('SupportScreen');
  };

  const recentPosts = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "Just donated 5 meals to the local shelter! Every little bit helps ❤️",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
      likes: 24,
      comments: 8,
      timeAgo: "2h ago",
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
      author: "Mike Chen",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      content: "Proud to be part of this amazing community! Another successful food drive today.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop",
      likes: 35,
      comments: 12,
      timeAgo: "4h ago",
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
    {
      id: 3,
      author: "Emma Davis",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      content: "Just signed up for the weekend food drive. Who else is joining? Let's make a difference together! #FoodSecurity",
      likes: 18,
      comments: 7,
      timeAgo: "6h ago",
      previewComments: [
        {
          id: 301,
          user: 'Michael Roberts',
          comment: 'Count me in! What time does it start?',
          time: '5h ago'
        },
        {
          id: 302,
          user: 'Jennifer Lee',
          comment: 'Ill be bringing some friends along too!',
          time: '3h ago'
        }
      ]
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Weekend Food Drive",
      date: "This Saturday",
      participants: 45,
    },
    {
      id: 2,
      title: "Community Kitchen Day",
      date: "Next Tuesday",
      participants: 28,
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.actionGrid}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.gridItem} onPress={handleSupportPress}>
              <Icon name="hand-heart" size={30} color={Colors.primary} />
              <Text style={styles.actionTitle}>{t('CommunityActions.Support')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem} onPress={handlePostPress}>
              <Icon name="post" size={30} color={Colors.primary} />
              <Text style={styles.actionTitle}>{t('CommunityActions.Post')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.headerContainer}>
              <Text style={styles.summaryTitle}>Community Feed</Text>
              <TouchableOpacity onPress={handlePostPress}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.postsContainer}>
              {recentPosts.map(post => (
                <TouchableOpacity 
                  key={post.id} 
                  style={styles.postItem}
                  onPress={handlePostPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.postHeader}>
                    <Image source={{ uri: post.avatar }} style={styles.avatar} />
                    <View style={styles.postHeaderInfo}>
                      <Text style={styles.postAuthor}>{post.author}</Text>
                      <Text style={styles.postTime}>{post.timeAgo}</Text>
                    </View>
                  </View>
                  <Text style={styles.postContent}>{post.content}</Text>
                  
                  {post.image && (
                    <Image 
                      source={{ uri: post.image }} 
                      style={styles.postImage}
                      resizeMode="cover"
                    />
                  )}
                  
                  <View style={styles.postStats}>
                    <TouchableOpacity style={styles.statItem}>
                      <Icon name="heart" size={18} color={Colors.primary} />
                      <Text style={styles.statText}>{post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem}>
                      <Icon name="comment" size={18} color={Colors.primary} />
                      <Text style={styles.statText}>{post.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem}>
                      <Icon name="share" size={18} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                  
                  {/* Preview Comments */}
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
                        <TouchableOpacity onPress={handlePostPress}>
                          <Text style={styles.viewAllCommentsText}>
                            View all {post.comments} comments
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  
                  {/* Comment Input Field */}
                  <TouchableOpacity 
                    style={styles.commentInputContainer}
                    onPress={handlePostPress}
                  >
                    <Text style={styles.commentInputPlaceholder}>Add a comment...</Text>
                    <Icon name="send" size={16} color={Colors.textSecondary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.showMoreButton}
              onPress={handlePostPress}
            >
              <Text style={styles.showMoreText}>Show More Posts</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  actionGrid: {
    marginTop: '-5%',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  gridItem: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    width: '45%',
    ...Shadows.small,
  },
  actionTitle: {
    ...Typography.labelMedium,
    marginTop: 8,
    color: Colors.textPrimary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    ...Shadows.small,
  },
  summaryTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  postsContainer: {
    gap: 16,
  },
  postItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
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
  postHeaderInfo: {
    marginLeft: 10,
  },
  postAuthor: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  postTime: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  postContent: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
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
  viewAllCommentsText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 14,
  },
  commentInputPlaceholder: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  showMoreButton: {
    marginTop: 16,
    backgroundColor: '#f0e6f2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  showMoreText: {
    color: Colors.primary,
    fontWeight: '500',
  },
});
