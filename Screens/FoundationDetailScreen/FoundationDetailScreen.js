
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../common/design';

const { width } = Dimensions.get('window');

const FoundationDetailScreen = ({ route, navigation }) => {
  const { ngoData } = route.params || {
    id: 1,
    name: "World Wildlife Fund",
    username: "@WorldWildlife",
    location: "Washington, DC",
    description: "Conserving nature and protecting the planet for future generations.",
    imageUrl: "https://i.ibb.co/sP3jS4d/logo-ptf-unicef.jpg",
    verified: true,
    backgroundImage: "https://images.unsplash.com/photo-1581092160607-ee22731c9c22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    followers: "12.5K",
    following: "245",
    foundedDate: "1961",
    socialLinks: {
      twitter: "worldwildlife",
      facebook: "worldwildlife",
      instagram: "worldwildlife",
    },
  };

  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Emergency Relief Needed",
      content: "We're raising funds for emergency relief after the recent floods. Your donation can provide clean water, food, and shelter to affected families.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      likes: 324,
      comments: 56,
      shares: 89,
      timeAgo: "3 hours ago",
    },
    {
      id: 2,
      title: "Join Our Volunteer Program",
      content: "Make a difference by joining our volunteer program. Help us distribute food and supplies to communities in need.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      likes: 187,
      comments: 23,
      shares: 42,
      timeAgo: "1 day ago",
    },
    {
      id: 3,
      title: "Thank You for Your Support",
      content: "Thanks to your generous donations, we've been able to provide meals for 10,000 families last month. Your support makes a real difference!",
      image: "https://images.unsplash.com/photo-1593113598332-cd59a93c6138?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      likes: 432,
      comments: 67,
      shares: 102,
      timeAgo: "3 days ago",
    },
  ]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const renderPost = (post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: ngoData.imageUrl }} style={styles.postProfilePic} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postAuthor}>{ngoData.name}</Text>
          <Text style={styles.postTime}>{post.timeAgo}</Text>
        </View>
      </View>
      
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.content}</Text>
      
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
      
      <View style={styles.postStats}>
        <View style={styles.statItem}>
          <Icon name="heart-outline" size={20} color={Colors.primary} />
          <Text style={styles.statText}>{post.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="chatbubble-outline" size={20} color={Colors.primary} />
          <Text style={styles.statText}>{post.comments}</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="share-social-outline" size={20} color={Colors.primary} />
          <Text style={styles.statText}>{post.shares}</Text>
        </View>
      </View>
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-social-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{ngoData.name}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-social-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: ngoData.backgroundImage }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          <View style={styles.profileOverlay}>
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: ngoData.imageUrl }} style={styles.profileImage} />
            </View>
            
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{ngoData.name}</Text>
              {ngoData.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.username}>{ngoData.username}</Text>
            <Text style={styles.location}>
              <Icon name="location-outline" size={16} color="#666" /> {ngoData.location}
            </Text>
            
            <Text style={styles.description}>{ngoData.description}</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.followButton,
              isFollowing ? styles.followingButton : {}
            ]}
            onPress={toggleFollow}
          >
            <Text style={[
              styles.followButtonText,
              isFollowing ? styles.followingButtonText : {}
            ]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{ngoData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{ngoData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{ngoData.foundedDate}</Text>
              <Text style={styles.statLabel}>Founded</Text>
            </View>
          </View>
          
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="logo-twitter" size={22} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="logo-facebook" size={22} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="logo-instagram" size={22} color="#C13584" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="globe-outline" size={22} color="#0077B5" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.donateButton}>
          <Icon name="heart" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.donateButtonText}>Donate Now</Text>
        </TouchableOpacity>
        
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          {posts.map(post => renderPost(post))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 160, // Reduced from 180 to reduce whitespace
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  profileOverlay: {
    padding: 16, // Reduced from 20 to tighten spacing
    paddingTop: 60, // Reduced from 65 to tighten spacing
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'absolute',
    top: -45, // Adjusted from -50 to position closer to the cover image
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 3, // Added border for better definition
    borderColor: Colors.primary, // Using app's primary color
    padding: 3, // Reduced from 5 to make it more compact
    borderRadius: 60,
    ...Shadows.medium,
  },
  profileImage: {
    width: 85, // Slightly reduced from 90
    height: 85, // Slightly reduced from 90
    borderRadius: 42.5,
    borderWidth: 1, // Added subtle inner border
    borderColor: 'rgba(255,255,255,0.8)',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 3, // Reduced from 5
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary, // Changed to match app theme
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  verifiedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: Colors.textSecondary, // Updated to use theme color
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary, // Updated to use theme color
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textPrimary, // Updated to use theme color
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  followButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: BorderRadius.round, // Using theme border radius
    marginVertical: 12, // Reduced from 15
    alignSelf: 'center',
    ...Shadows.small,
  },
  followingButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  followingButtonText: {
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 15,
    marginBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary, // Changed to primary color
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary, // Updated to use theme color
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#eee',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    ...Shadows.small,
  },
  donateButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary, // Using theme color instead of fixed #E74C3C
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    margin: 20,
    borderRadius: 12,
    ...Shadows.medium,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  postsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary, // Updated to theme color
    marginBottom: 15,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    ...Shadows.small,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postProfilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 1, // Added subtle border
    borderColor: Colors.primary, // Using theme color
  },
  postHeaderInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary, // Updated to use theme color
  },
  postTime: {
    fontSize: 12,
    color: Colors.textSecondary, // Updated to use theme color
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary, // Changed to primary color
    marginBottom: 8,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textPrimary, // Updated to use theme color
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    fontSize: 14,
    color: Colors.textSecondary, // Updated to use theme color
    marginLeft: 6,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: Colors.textSecondary, // Updated to use theme color
    marginLeft: 8,
  },
});

export default FoundationDetailScreen;
