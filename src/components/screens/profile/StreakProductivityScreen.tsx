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

interface StreakProductivityScreenProps {
  navigation: NavigationProp;
}

const SettingRow: React.FC<{
  label: string;
  helper?: string;
  actionLabel?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  isDestructive?: boolean;
}> = ({ label, helper, actionLabel, onPress, children, isDestructive }) => (
  <View style={styles.settingRow}>
    <View style={styles.settingTextWrapper}>
      <Text style={styles.settingLabel}>{label}</Text>
      {helper && <Text style={styles.settingHelper}>{helper}</Text>}
    </View>
    {children
      ? children
      : actionLabel && (
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

const StreakProductivityScreen: React.FC<StreakProductivityScreenProps> = ({ navigation }) => {
  const [showStreaks, setShowStreaks] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [achievementBadges, setAchievementBadges] = useState(false);

  const handleResetStreak = () => {
    Alert.alert(
      'Reset Streak Data',
      'This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Streak data has been reset.');
          },
        },
      ]
    );
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
          <Text style={styles.headerTitle}>Streak & Productivity</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionCard}>
            <SettingRow label="Show streaks on home">
              <Switch
                value={showStreaks}
                onValueChange={setShowStreaks}
                thumbColor={showStreaks ? '#E88B6B' : '#f4f3f4'}
                trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
              />
            </SettingRow>
            <SettingRow
              label="Reset streak data"
              helper="This action cannot be undone."
              actionLabel="Reset"
              onPress={handleResetStreak}
              isDestructive
            />
            <SettingRow label="Weekly productivity summary">
              <Switch
                value={weeklySummary}
                onValueChange={setWeeklySummary}
                thumbColor={weeklySummary ? '#E88B6B' : '#f4f3f4'}
                trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
              />
            </SettingRow>
            <SettingRow label="Achievement badges">
              <Switch
                value={achievementBadges}
                onValueChange={setAchievementBadges}
                thumbColor={achievementBadges ? '#E88B6B' : '#f4f3f4'}
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

export default StreakProductivityScreen;

