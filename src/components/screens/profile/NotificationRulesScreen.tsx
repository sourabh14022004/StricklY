import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
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

interface NotificationRulesScreenProps {
  navigation: NavigationProp;
}

const SettingRow: React.FC<{
  label: string;
  helper?: string;
  children?: React.ReactNode;
}> = ({ label, helper, children }) => (
  <View style={styles.settingRow}>
    <View style={styles.settingTextWrapper}>
      <Text style={styles.settingLabel}>{label}</Text>
      {helper && <Text style={styles.settingHelper}>{helper}</Text>}
    </View>
    {children}
  </View>
);

const NotificationRulesScreen: React.FC<NotificationRulesScreenProps> = ({ navigation }) => {
  const [showSummary, setShowSummary] = useState(true);
  const [autoDelete, setAutoDelete] = useState(false);
  const [prioritizeCalls, setPrioritizeCalls] = useState(true);

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
          <Text style={styles.headerTitle}>Captured Notification Rules</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionCard}>
            <SettingRow label="Show summary after focus ends">
              <Switch
                value={showSummary}
                onValueChange={setShowSummary}
                thumbColor={showSummary ? '#E88B6B' : '#f4f3f4'}
                trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
              />
            </SettingRow>
            <SettingRow label="Auto-delete captured notifications">
              <Switch
                value={autoDelete}
                onValueChange={setAutoDelete}
                thumbColor={autoDelete ? '#E88B6B' : '#f4f3f4'}
                trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
              />
            </SettingRow>
            <SettingRow
              label="Prioritize important calls"
              helper="Allow calls from favorites during focus."
            >
              <Switch
                value={prioritizeCalls}
                onValueChange={setPrioritizeCalls}
                thumbColor={prioritizeCalls ? '#E88B6B' : '#f4f3f4'}
                trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
              />
            </SettingRow>
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
});

export default NotificationRulesScreen;

