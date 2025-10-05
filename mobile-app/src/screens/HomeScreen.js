import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const {user, logout} = useAuth();
  const {colors} = useTheme();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      title: 'Personal Trainer',
      subtitle: 'Workout schedules & reminders',
      icon: 'fitness-center',
      color: '#ff6b35',
      screen: 'PersonalTrainer',
    },
    {
      title: 'My Dashboard',
      subtitle: 'Track your progress',
      icon: 'dashboard',
      color: '#17a2b8',
      screen: 'Dashboard',
    },
    {
      title: 'My Profile',
      subtitle: 'Update your information',
      icon: 'person',
      color: '#28a745',
      screen: 'Profile',
    },
    {
      title: 'AI Chat',
      subtitle: 'Get personalized advice',
      icon: 'chat',
      color: '#6f42c1',
      screen: 'Chat',
    },
  ];

  const quickActions = [
    {
      title: 'Today\'s Workout',
      icon: 'schedule',
      color: '#ff6b35',
      screen: 'Workout',
    },
    {
      title: 'Meal Plan',
      icon: 'restaurant',
      color: '#28a745',
      screen: 'Meal',
    },
    {
      title: 'Progress',
      icon: 'trending-up',
      color: '#17a2b8',
      screen: 'Dashboard',
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>
                {user?.first_name || user?.phone_number || 'User'}! 👋
              </Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Icon name="logout" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, {backgroundColor: colors.surface}]}>
            <Card.Content style={styles.statContent}>
              <Icon name="fitness-center" size={30} color="#ff6b35" />
              <Text style={[styles.statNumber, {color: colors.text}]}>3</Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Workouts Today
              </Text>
            </Card.Content>
          </Card>
          
          <Card style={[styles.statCard, {backgroundColor: colors.surface}]}>
            <Card.Content style={styles.statContent}>
              <Icon name="restaurant" size={30} color="#28a745" />
              <Text style={[styles.statNumber, {color: colors.text}]}>5</Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Meals Planned
              </Text>
            </Card.Content>
          </Card>
          
          <Card style={[styles.statCard, {backgroundColor: colors.surface}]}>
            <Card.Content style={styles.statContent}>
              <Icon name="trending-up" size={30} color="#17a2b8" />
              <Text style={[styles.statNumber, {color: colors.text}]}>85%</Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Goal Progress
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Main Menu */}
        <View style={styles.menuContainer}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            Main Features
          </Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen)}>
              <Card style={[styles.menuCard, {backgroundColor: colors.surface}]}>
                <Card.Content style={styles.menuContent}>
                  <View style={[styles.menuIcon, {backgroundColor: item.color}]}>
                    <Icon name={item.icon} size={24} color="#ffffff" />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={[styles.menuTitle, {color: colors.text}]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.menuSubtitle, {color: colors.textSecondary}]}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={24} color={colors.textSecondary} />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(action.screen)}
                style={styles.quickActionItem}>
                <View style={[styles.quickActionIcon, {backgroundColor: action.color}]}>
                  <Icon name={action.icon} size={24} color="#ffffff" />
                </View>
                <Text style={[styles.quickActionText, {color: colors.text}]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Tip */}
        <Card style={[styles.tipCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Icon name="lightbulb" size={24} color="#ffc107" />
              <Text style={[styles.tipTitle, {color: colors.text}]}>
                Today's Tip
              </Text>
            </View>
            <Text style={[styles.tipText, {color: colors.textSecondary}]}>
              Stay hydrated! Drink at least 8 glasses of water today to maintain 
              optimal performance during your workouts.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        style={[styles.fab, {backgroundColor: colors.primary}]}
        icon="chat"
        onPress={() => navigation.navigate('Chat')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoutButton: {
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuCard: {
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuSubtitle: {
    fontSize: 14,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  tipCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
