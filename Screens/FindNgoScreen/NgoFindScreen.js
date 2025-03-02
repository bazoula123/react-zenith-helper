
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Animated,
} from 'react-native';
import FooterNavigator from '../FooterNavigator/FooterNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Commons/Header';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, Shadows } from '../../common/design';
import { MaterialIcons } from '@expo/vector-icons';

const NGOs = [
    {
        id: 1,
        name: "World Wildlife Fund",
        username: "@WorldWildlife",
        location: "Washington, DC",
        description: "Conserving nature and protecting the planet for future generations.",
        imageUrl: "https://i.ibb.co/sP3jS4d/logo-ptf-unicef.jpg",
        backgroundImage: "https://images.unsplash.com/photo-1581092160607-ee22731c9c22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        verified: true,
        followers: "12.5K",
        following: "245",
        foundedDate: "1961",
    },
    {
        id: 2,
        name: "Doctors Without Borders",
        username: "@MSF",
        location: "Geneva, Switzerland",
        description: "Providing medical aid where it's needed most, regardless of race, religion, or political affiliation.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Doctors_Without_Borders_logo.svg/768px-Doctors_Without_Borders_logo.svg.png",
        backgroundImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        verified: true,
        followers: "8.7K",
        following: "102",
        foundedDate: "1971",
    },
    {
        id: 3,
        name: "UNICEF",
        username: "@UNICEF",
        location: "New York, USA",
        description: "UNICEF, originally called the United Nations International Children's Emergency Fund, works in over 190 countries to protect children's rights and well-being.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNICEF_logo_2018.svg/1024px-UNICEF_logo_2018.svg.png",
        backgroundImage: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        verified: true,
        followers: "15.3K",
        following: "328",
        foundedDate: "1946",
    },
    {
        id: 4,
        name: "Amnesty International",
        username: "@Amnesty",
        location: "London, UK",
        description: "Fighting for human rights across the globe and protecting individuals wherever justice, fairness, and truth are denied.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Amnesty_International_Logo.svg/1024px-Amnesty_International_Logo.svg.png",
        backgroundImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        verified: true,
        followers: "9.1K",
        following: "187",
        foundedDate: "1961",
    }
];

export default function NgoFindScreen() {
    const navigation = useNavigation();
    const [subscribedNGOs, setSubscribedNGOs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNGO, setSelectedNGO] = useState(null);
    const scaleAnim = useState(new Animated.Value(0.8))[0];
    const opacityAnim = useState(new Animated.Value(0))[0];

    const handleNgoPress = (ngo) => {
        navigation.navigate('NGODetail', { ngoData: ngo });
    };

    const handleSubscribePress = (ngo) => {
        if (subscribedNGOs.includes(ngo.id)) {
            // Already subscribed, just unsubscribe
            setSubscribedNGOs(subscribedNGOs.filter(id => id !== ngo.id));
        } else {
            // Show confirmation modal for new subscription
            setSelectedNGO(ngo);
            setModalVisible(true);
            
            // Animate the modal
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start();
        }
    };

    const confirmSubscription = () => {
        if (selectedNGO) {
            // Add to subscribed list
            setSubscribedNGOs([...subscribedNGOs, selectedNGO.id]);
            
            // Hide confirmation modal
            closeModal();
            
            // Navigate to foundation detail screen
            navigation.navigate('FoundationDetailScreen', { ngoData: selectedNGO });
        }
    };

    const closeModal = () => {
        // Animate the modal closing
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            })
        ]).start(() => {
            setModalVisible(false);
            setSelectedNGO(null);
        });
    };

    const handleCreateNGO = () => {
        navigation.navigate('NgoCreationScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Foundations & Charities</Text>
                    <Text style={styles.subtitle}>Subscribe to foundations you want to support</Text>
                </View>
                
                {/* Create NGO Button */}
                <TouchableOpacity 
                    style={styles.createNgoButton}
                    onPress={handleCreateNGO}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="add-circle" size={24} color="white" />
                    <Text style={styles.createNgoText}>Create Foundation</Text>
                </TouchableOpacity>
                
                <View style={styles.cardContainer}>
                    {NGOs.map((ngo) => {
                        const isSubscribed = subscribedNGOs.includes(ngo.id);
                        
                        return (
                            <TouchableOpacity 
                                key={ngo.id} 
                                style={styles.ngoCard}
                                onPress={() => handleNgoPress(ngo)}
                                activeOpacity={0.9}
                            >
                                <View style={styles.cardContent}>
                                    <View style={styles.logoContainer}>
                                        <Image source={{ uri: ngo.imageUrl }} style={styles.ngoLogo} />
                                    </View>
                                    <View style={styles.ngoInfo}>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.ngoName}>{ngo.name}</Text>
                                            {ngo.verified && (
                                                <View style={styles.verifiedBadge}>
                                                    <Text style={styles.verifiedText}>✓</Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text style={styles.ngoUsername}>{ngo.username}</Text>
                                        <Text style={styles.ngoLocation}>{ngo.location}</Text>
                                        <Text numberOfLines={2} style={styles.ngoDescription}>
                                            {ngo.description}
                                        </Text>
                                        
                                        <TouchableOpacity
                                            style={[
                                                styles.subscribeButton,
                                                isSubscribed ? styles.subscribedButton : {}
                                            ]}
                                            onPress={() => handleSubscribePress(ngo)}
                                        >
                                            <Text style={[
                                                styles.subscribeText,
                                                isSubscribed ? styles.subscribedText : {}
                                            ]}>
                                                {isSubscribed ? 'Following' : 'Follow'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Confirmation Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="none"
                onRequestClose={closeModal}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={closeModal}
                >
                    <Animated.View 
                        style={[
                            styles.modalContainer,
                            {
                                transform: [{ scale: scaleAnim }],
                                opacity: opacityAnim
                            }
                        ]}
                    >
                        <TouchableOpacity activeOpacity={1}>
                            <View style={styles.modalContent}>
                                {selectedNGO && (
                                    <View style={styles.modalHeader}>
                                        <Image source={{ uri: selectedNGO.imageUrl }} style={styles.modalLogo} />
                                        <Text style={styles.modalTitle}>Follow {selectedNGO.name}?</Text>
                                    </View>
                                )}
                                
                                <Text style={styles.modalMessage}>
                                    Following this foundation will allow you to receive notifications when help is needed. 
                                    You'll be updated on urgent needs and opportunities to make a difference.
                                </Text>
                                
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity 
                                        style={styles.cancelButton}
                                        onPress={closeModal}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={styles.confirmButton}
                                        onPress={confirmSubscription}
                                    >
                                        <Text style={styles.confirmButtonText}>Follow</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
            <FooterNavigator />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    titleContainer: {
        padding: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#7F8C8D',
        marginBottom: 10,
    },
    // Create NGO Button styles
    createNgoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 14,
        borderRadius: BorderRadius.lg,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    createNgoText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    cardContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    ngoCard: {
        width: '90%',
        marginBottom: 20,
        borderRadius: 16,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardContent: {
        padding: 16,
        flexDirection: 'row',
    },
    logoContainer: {
        marginRight: 16,
    },
    ngoLogo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    ngoInfo: {
        flex: 1,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ngoName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginRight: 6,
    },
    verifiedBadge: {
        backgroundColor: Colors.primary,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifiedText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
    },
    ngoUsername: {
        fontSize: 14,
        color: '#7F8C8D',
        marginBottom: 4,
    },
    ngoLocation: {
        fontSize: 14,
        color: '#7F8C8D',
        marginBottom: 8,
    },
    ngoDescription: {
        fontSize: 15,
        color: '#34495E',
        lineHeight: 22,
        marginBottom: 16,
    },
    subscribeButton: {
        backgroundColor: 'white',
        borderColor: Colors.primary,
        borderWidth: 1.5,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    subscribedButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    subscribeText: {
        color: Colors.primary,
        fontSize: 15,
        fontWeight: '600',
    },
    subscribedText: {
        color: 'white',
    },
    
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    modalContent: {
        padding: 20,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    modalLogo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: Colors.primary,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        lineHeight: 24,
        color: '#34495E',
        textAlign: 'center',
        marginBottom: 25,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        marginRight: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: '#7F8C8D',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        marginLeft: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
