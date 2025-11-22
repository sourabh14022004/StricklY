import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Linking,
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

interface PermissionsScreenProps {
  navigation: NavigationProp;
}

const SettingRow: React.FC<{
  label: string;
  status: 'On' | 'Off' | 'Allowed' | 'Restricted';
  onPress: () => void;
}> = ({ label, status, onPress }) => {
  const isAllowed = status === 'On' || status === 'Allowed';
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingTextWrapper}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={[styles.settingStatus, !isAllowed && styles.settingStatusError]}>
          {status}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={styles.settingButton}
        activeOpacity={0.7}
      >
        <Text style={styles.settingButtonText}>Open Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const PermissionsScreen: React.FC<PermissionsScreenProps> = ({ navigation }) => {
  const [permissions, setPermissions] = useState({
    notification: 'On' as 'On' | 'Off',
    dnd: 'Off' as 'On' | 'Off',
    battery: 'Allowed' as 'Allowed' | 'Restricted',
  });

  const handleOpenSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      Alert.alert('Error', 'Unable to open settings.');
    }
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
          <Text style={styles.headerTitle}>Permissions</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionCard}>
            <SettingRow
              label="Notification Access"
              status={permissions.notification}
              onPress={handleOpenSettings}
            />
            <SettingRow
              label="Do Not Disturb Access"
              status={permissions.dnd}
              onPress={handleOpenSettings}
            />
            <SettingRow
              label="Battery Optimization"
              status={permissions.battery}
              onPress={handleOpenSettings}
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
  settingStatus: {
    marginTop: 6,
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  settingStatusError: {
    color: '#EF4444',
  },
  settingButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  settingButtonText: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default PermissionsScreen;

