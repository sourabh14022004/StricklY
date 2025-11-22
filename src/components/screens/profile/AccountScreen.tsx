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
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingModal from '../../../modals/LoadingModal';

type ProfileScreenName = 
  | 'ProfileMain'
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
  goBack: () => void;
}

interface AccountScreenProps {
  navigation: NavigationProp;
}

const SettingRow: React.FC<{
  label: string;
  helper?: string;
  actionLabel?: string;
  onPress?: () => void;
  isDestructive?: boolean;
}> = ({ label, helper, actionLabel, onPress, isDestructive }) => (
  <View style={styles.settingRow}>
    <View style={styles.settingTextWrapper}>
      <Text style={styles.settingLabel}>{label}</Text>
      {helper && <Text style={styles.settingHelper}>{helper}</Text>}
    </View>
    {actionLabel && (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.settingButton,
          isDestructive && styles.settingButtonDestructive,
        ]}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.settingButtonText,
            isDestructive && styles.settingButtonTextDestructive,
          ]}
        >
          {actionLabel}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const { user, signOut, loading } = useAuth();

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

  const handlePlaceholderAction = (label: string) => {
    Alert.alert(label, 'This feature will be available soon.');
  };

  return (
    <>
      <LoadingModal visible={loading} message="Please wait..." />
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0F1115" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account</Text>
            <View style={styles.headerRightPlaceholder} />
          </View>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {!user ? (
              <View style={styles.sectionCard}>
                <SettingRow
                  label="Account"
                  helper="Log in to sync streaks across devices."
                  actionLabel="Login / Sign Up"
                  onPress={() => handlePlaceholderAction('Login / Sign Up')}
                />
              </View>
            ) : (
              <>
                <View style={styles.sectionCard}>
                  <SettingRow
                    label="Account"
                    helper="Manage your Streakly account settings."
                  />
                  <SettingRow
                    label="Change Password"
                    actionLabel="Update"
                    onPress={() => handlePlaceholderAction('Change Password')}
                  />
                  <SettingRow
                    label="Edit Profile"
                    helper="Update your name, email, and profile picture."
                    actionLabel="Edit"
                    onPress={() => handlePlaceholderAction('Edit Profile')}
                  />
                </View>

                <View style={styles.sectionCard}>
                  <SettingRow
                    label="Logout"
                    helper="Sign out of your account."
                    actionLabel="Sign Out"
                    onPress={handleSignOut}
                    isDestructive
                  />
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerRightPlaceholder: {
    width: 32,
  },
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  settingTextWrapper: {
    flex: 1,
    paddingRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0B1220',
  },
  settingHelper: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 4,
  },
  settingButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  settingButtonDestructive: {
    backgroundColor: '#FEE2E2',
  },
  settingButtonText: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 13,
  },
  settingButtonTextDestructive: {
    color: '#DC2626',
  },
});

export default AccountScreen;

