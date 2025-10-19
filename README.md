# Streakly 🔥

**Your intelligent task management companion**

Streakly is a React Native app that helps you manage and prioritize daily tasks from multiple sources — calendar events, manual tasks, and captured notifications. It uses AI to show important tasks first, sends reminders with personalized tones, and tracks your productivity streaks.

## 🎯 Key Features

### Core Features Implemented
- ✅ **Unified Task Management** - Create, view, edit, and complete tasks
- ✅ **AI-Powered Prioritization** - Smart sorting based on importance, urgency, and due dates
- ✅ **Streak Tracking** - Visual streak calendar and achievement system
- ✅ **Multi-Source Task Aggregation** - Manual tasks with calendar integration ready
- ✅ **Firebase Authentication** - Secure user accounts and data sync
- ✅ **Responsive UI** - Beautiful, intuitive interface with dark mode support

### Upcoming Features
- 🔄 **Google Calendar Integration** - Sync events and create tasks
- 🔄 **Smart Notifications** - Personalized reminders with different tones
- 🔄 **Notification Capture** - Convert notifications to actionable tasks
- 🔄 **Smart DND Mode** - Auto-activate during important tasks
- 🔄 **Advanced Analytics** - Detailed productivity insights

## 🏗️ Technical Architecture

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **UI Library**: Custom components with Material Design inspiration
- **State Management**: React Hooks with Context API
- **Language**: TypeScript for type safety

### Backend
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Notifications**: Firebase Cloud Messaging
- **Storage**: Firebase Storage for media files

### Integrations
- **Google Calendar API** - Calendar event sync
- **System Notifications** - Advanced notification capture
- **System DND APIs** - Smart Do Not Disturb management

## 📱 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Firebase account
- iOS Simulator (macOS) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StreakLy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase configuration
   - Update `src/services/firebase.ts` with your config

4. **Run the app**
   ```bash
   npm start
   ```

   Then press `i` for iOS simulator or `a` for Android emulator.

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/           # Screen components
│   ├── auth/          # Authentication screens
│   └── main/          # Main app screens
├── navigation/         # Navigation configuration
├── services/          # API and business logic
│   ├── firebase.ts   # Firebase configuration
│   ├── authService.ts # Authentication service
│   └── taskService.ts # Task management service
├── types/            # TypeScript type definitions
├── constants/        # App constants and configuration
└── utils/           # Utility functions
```

## 📊 Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  streaks: StreakData;
  preferences: UserPreferences;
  dndSettings: DNDSettings;
  integrationSettings: IntegrationSettings;
}
```

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  source: 'calendar' | 'manual' | 'notification' | 'smart_suggestion';
  importance: 'low' | 'medium' | 'high' | 'critical';
  urgency: 'low' | 'medium' | 'high';
  dueDate?: boolean;
  completed: boolean;
  tags: string[];
  userId: string;
}
```

## 🎨 UI/UX Design

The app follows Material Design principles with:
- **Color Scheme**: Purple primary with semantic colors for importance levels
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Card-based layout with proper shadows and elevation
- **Icons**: Ionicons for consistency across platforms

## 🚀 Features Deep Dive

### AI Prioritization System
Tasks are scored based on:
- **Importance** (40% weight) - User-defined importance level
- **Urgency** (30% weight) - Due date proximity
- **Source** (15% weight) - Calendar events get priority
- **Time** (10% weight) - Scheduled vs. current time
- **Streaks** (5% weight) - Maintaining productivity streaks

### Streak Tracking
- Daily task completion tracking
- Visual calendar heatmap
- Achievement system with milestones
- Motivational reminders and tips

### Smart Task Management
- Cross-platform sync via Firebase
- Intelligent task suggestions
- Tag-based organization
- Duplicate detection

## 🔧 Development

### Code Style
- TypeScript strict mode enabled
- ESLint configuration
- Prettier for code formatting
- CamelCase for variables, PascalCase for components

### Testing
```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

### Building for Production

#### iOS
```bash
# Build for iOS
expo build:ios
```

#### Android
```bash
# Build for Android
expo build:android
```

## 🔐 Security

- **Firebase Security Rules** - Data access control
- **Authentication** - Secure user verification
- **Data Encryption** - Local encryption for sensitive data
- **Privacy** - Optional data collection with user control

## 📈 Performance

- **Optimized Images** - Expo Image component
- **Efficient Lists** - FlatList with proper keyExtractor
- **Memory Management** - Proper cleanup in useEffect
- **Bundle Size** - Tree-shaking and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
- Check the [Issues](https://github.com/yourusername/StreakLy/issues) page
- Create a new issue with detailed description
- Join our Discord community (coming soon)

## 🗺️ Roadmap

### Phase 1: Core Features (Current)
- [x] User authentication and onboarding
- [x] Basic task management (CRUD)
- [x] AI prioritization system
- [x] Streak tracking and visualization
- [x] Settings and preferences

### Phase 2: Advanced Features (Q2 2024)
- [ ] Google Calendar integration
- [ ] Smart notification system
- [ ] Notification capture
- [ ] Advanced analytics dashboard

### Phase 3: Intelligence Features (Q3 2024)
- [ ] Smart DND mode
- [ ] Intelligent task suggestions
- [ ] Predictive scheduling
- [ ] Voice commands integration

### Phase 4: Team Features (Q4 2024)
- [ ] Team collaboration
- [ ] Shared calendars and projects
- [ ] Team productivity analytics
- [ ] Advanced reporting

## 📞 Contact

- **Developer**: [Your Name](mailto:your.email@example.com)
- **Project Website**: [streakly.app](https://streakly.app)
- **Twitter**: [@streaklyapp](https://twitter.com/streaklyapp)

---

Made with ❤️ using React Native and Firebase

# StricklY
