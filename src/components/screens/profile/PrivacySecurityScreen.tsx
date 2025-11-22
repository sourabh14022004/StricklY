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

interface PrivacySecurityScreenProps {
  navigation: NavigationProp;
}

const SettingRow: React.FC<{
  label: string;
  helper?: string;
  actionLabel: string;
  onPress: () => void;
  isDestructive?: boolean;
}> = ({ label, helper, actionLabel, onPress, isDestructive }) => (
  <View style={styles.settingRow}>
    <View style={styles.settingTextWrapper}>
      <Text style={styles.settingLabel}>{label}</Text>
      {helper && <Text style={styles.settingHelper}>{helper}</Text>}
    </View>
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
  </View>
);

const PrivacySecurityScreen: React.FC<PrivacySecurityScreenProps> = ({ navigation }) => {

  const handleDeleteNotifications = () => {
    Alert.alert(
      'Delete All Captured Notifications',
      'This will permanently delete all captured notifications. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'All captured notifications have been deleted.');
          },
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear App Data & Cache',
      'This will clear all app data and cache. You will need to sign in again.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'App data and cache have been cleared.');
          },
        },
      ]
    );
  };

  const handlePlaceholderAction = (label: string) => {
    Alert.alert(label, 'This feature will be available soon.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1115" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy & Security</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionCard}>
            <SettingRow
              label="Delete all captured notifications"
              actionLabel="Delete"
              onPress={handleDeleteNotifications}
              isDestructive
            />
            <SettingRow
              label="Export notifications"
              helper="Download your captured notifications as a file."
              actionLabel="Export"
              onPress={() => handlePlaceholderAction('Export Notifications')}
            />
            <SettingRow
              label="Clear app data & cache"
              helper="Remove all stored data and cached files."
              actionLabel="Clear"
              onPress={handleClearData}
              isDestructive
            />
            <SettingRow
              label="Manage local storage"
              helper="View and manage storage usage."
              actionLabel="Manage"
              onPress={() => handlePlaceholderAction('Manage Local Storage')}
            />
            <SettingRow
              label="Permission Explanations"
              helper="Learn why we need each permission."
              actionLabel="View"
              onPress={() => handlePlaceholderAction('Permission Explanations')}
            />
            <SettingRow
              label="Privacy Policy"
              actionLabel="View"
              onPress={() => handlePlaceholderAction('Privacy Policy')}
            />
            <SettingRow
              label="Terms of Service"
              actionLabel="View"
              onPress={() => handlePlaceholderAction('Terms of Service')}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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

export default PrivacySecurityScreen;

