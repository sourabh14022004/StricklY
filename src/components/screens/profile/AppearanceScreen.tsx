import React, { useState } from 'react';
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

interface AppearanceScreenProps {
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

const AppearanceScreen: React.FC<AppearanceScreenProps> = ({ navigation }) => {
  const [theme, setTheme] = useState<'Light' | 'Dark' | 'System'>('System');

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
          <Text style={styles.headerTitle}>Appearance</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionCard}>
            <SettingRow
              label="Theme"
              helper="Light, dark or follow system appearance."
            />
            <View style={styles.themeOptions}>
              {(['Light', 'Dark', 'System'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.themeChip,
                    theme === option && styles.themeChipActive,
                  ]}
                  onPress={() => setTheme(option)}
                >
                  <Text
                    style={[
                      styles.themeChipText,
                      theme === option && styles.themeChipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <SettingRow
              label="Accent Color"
              helper="Choose a highlight color for the app."
            >
              <TouchableOpacity
                onPress={() => handlePlaceholderAction('Accent Color')}
                style={styles.colorPreview}
                activeOpacity={0.7}
              >
                <View style={styles.colorDot} />
              </TouchableOpacity>
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
  themeOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  themeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  themeChipActive: {
    backgroundColor: '#E88B6B',
    borderColor: '#E88B6B',
  },
  themeChipText: {
    color: '#4B5563',
    fontWeight: '600',
  },
  themeChipTextActive: {
    color: '#fff',
  },
  colorPreview: {
    padding: 4,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E88B6B',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
});

export default AppearanceScreen;

