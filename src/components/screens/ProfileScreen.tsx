import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import LoadingModal from '../../modals/LoadingModal';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type ProfileScreenName = 
  | 'Account'
  | 'Permissions'
  | 'FocusPreferences'
  | 'NotificationRules'
  | 'Appearance'
  | 'StreakProductivity'
  | 'PrivacySecurity'
  | 'About';

interface NavigationProp {
  navigate: (screen: ProfileScreenName) => void;
  goBack?: () => void;
}

interface SectionItem {
  id: ProfileScreenName;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface ProfileScreenProps {
  navigation?: NavigationProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, loading, signOut } = useAuth();
  
  const defaultNavigation: NavigationProp = {
    navigate: () => {},
  };
  
  const nav = navigation || defaultNavigation;

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  const sections: SectionItem[] = [
    { id: 'Account', title: 'Account', icon: 'person-outline' },
    { id: 'Permissions', title: 'Permissions', icon: 'lock-closed-outline' },
    { id: 'FocusPreferences', title: 'Focus Preferences', icon: 'time-outline' },
    { id: 'NotificationRules', title: 'Captured Notification Rules', icon: 'notifications-outline' },
    { id: 'Appearance', title: 'Appearance', icon: 'color-palette-outline' },
    { id: 'StreakProductivity', title: 'Streak & Productivity', icon: 'flame-outline' },
    { id: 'PrivacySecurity', title: 'Privacy & Security', icon: 'shield-checkmark-outline' },
    { id: 'About', title: 'About', icon: 'information-circle-outline' },
  ];

  return (
    <>
      <LoadingModal visible={loading} message="Please wait..." />
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0F1115" />
        <View style={styles.container}>
          <LinearGradient
            colors={['#f4f9ef', '#f1f6fb']}
            style={styles.heroBackground}
          />
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* <View style={styles.headerBar}>
              <View style={styles.headerIconButtonPlaceholder} />
              <Text style={styles.headerTitle}>Profile</Text>
              <TouchableOpacity
                style={styles.headerIconButton}
                onPress={() => {}}
                activeOpacity={0.7}
              >
                <Ionicons name="share-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View> */}

            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitials}>
                    {(user?.displayName || 'U')
                      .split(' ')
                      .map((p) => p[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </Text>
                </View>
                <View style={styles.userTextWrapper}>
                  <Text style={styles.userName}>
                    {user?.displayName || 'Galangal Richard'}
                  </Text>
                  <Text style={styles.userEmail}>
                    {user?.email || 'galangal82@gmail.com'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  activeOpacity={0.8}
                  onPress={() => nav.navigate('Account')}
                >
                  <Ionicons name="pencil" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionsContainer}>
              {sections.map((section) => (
                <TouchableOpacity
                  key={section.id}
                  style={styles.sectionRow}
                  activeOpacity={0.7}
                  onPress={() => nav.navigate(section.id)}
                >
                  <View style={styles.sectionLeft}>
                    <Ionicons
                      name={section.icon}
                      size={22}
                      color="#6B7280"
                      style={styles.sectionIcon}
                    />
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.logoutContainer}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleSignOut}
                activeOpacity={0.8}
              >
                <Ionicons name="log-out-outline" size={20} color="#F87171" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e6f3ef',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 260,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 4,
  },
  headerIconButtonPlaceholder: {
    width: 36,
    height: 36,
  },
  headerIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#6B7280',
    fontSize: 24,
    fontWeight: '700',
  },
  userTextWrapper: {
    flex: 1,
  },
  userName: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
  },
  userEmail: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E88B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  logoutContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 8,
    backgroundColor: '#FFECEF',
  },
  logoutText: {
    color: '#F87171',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen;
