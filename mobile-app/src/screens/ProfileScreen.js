import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, TextInput, Button, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';
import {userAPI} from '../services/api';

const ProfileScreen = ({navigation}) => {
  const {user, updateUser} = useAuth();
  const {colors, isDarkMode, toggleTheme} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    height: '',
    weight: '',
    age: '',
    fitness_goal: '',
    activity_level: '',
    medical_conditions: '',
    dietary_restrictions: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.data) {
        setProfileData(prev => ({
          ...prev,
          ...response.data,
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await userAPI.updateProfile(profileData);
      if (response.data) {
        updateUser(response.data);
        Alert.alert('Success', 'Profile updated successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Personal Information',
      icon: 'person',
      color: '#ff6b35',
    },
    {
      title: 'Fitness Goals',
      icon: 'flag',
      color: '#28a745',
    },
    {
      title: 'Health Information',
      icon: 'favorite',
      color: '#dc3545',
    },
    {
      title: 'Preferences',
      icon: 'settings',
      color: '#6f42c1',
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header */}
      <LinearGradient
        colors={['#28a745', '#20c997']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        {/* Profile Card */}
        <Card style={[styles.profileCard, {backgroundColor: colors.surface}]}>
          <Card.Content style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <Icon name="person" size={60} color={colors.primary} />
            </View>
            <Text style={[styles.userName, {color: colors.text}]}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text style={[styles.userPhone, {color: colors.textSecondary}]}>
              {user?.phone_number}
            </Text>
          </Card.Content>
        </Card>

        {/* Personal Information */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="person" size={24} color="#ff6b35" />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>
                Personal Information
              </Text>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="First Name"
                value={profileData.first_name}
                onChangeText={value => handleInputChange('first_name', value)}
                style={[styles.input, styles.halfInput]}
                theme={{colors: {primary: colors.primary}}}
              />
              <TextInput
                label="Last Name"
                value={profileData.last_name}
                onChangeText={value => handleInputChange('last_name', value)}
                style={[styles.input, styles.halfInput]}
                theme={{colors: {primary: colors.primary}}}
              />
            </View>

            <TextInput
              label="Email"
              value={profileData.email}
              onChangeText={value => handleInputChange('email', value)}
              keyboardType="email-address"
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />

            <TextInput
              label="Phone Number"
              value={profileData.phone_number}
              onChangeText={value => handleInputChange('phone_number', value)}
              keyboardType="phone-pad"
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />
          </Card.Content>
        </Card>

        {/* Fitness Information */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="fitness-center" size={24} color="#28a745" />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>
                Fitness Information
              </Text>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Height (cm)"
                value={profileData.height}
                onChangeText={value => handleInputChange('height', value)}
                keyboardType="numeric"
                style={[styles.input, styles.halfInput]}
                theme={{colors: {primary: colors.primary}}}
              />
              <TextInput
                label="Weight (kg)"
                value={profileData.weight}
                onChangeText={value => handleInputChange('weight', value)}
                keyboardType="numeric"
                style={[styles.input, styles.halfInput]}
                theme={{colors: {primary: colors.primary}}}
              />
            </View>

            <TextInput
              label="Age"
              value={profileData.age}
              onChangeText={value => handleInputChange('age', value)}
              keyboardType="numeric"
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />

            <TextInput
              label="Fitness Goal"
              value={profileData.fitness_goal}
              onChangeText={value => handleInputChange('fitness_goal', value)}
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />

            <TextInput
              label="Activity Level"
              value={profileData.activity_level}
              onChangeText={value => handleInputChange('activity_level', value)}
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />
          </Card.Content>
        </Card>

        {/* Health Information */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="favorite" size={24} color="#dc3545" />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>
                Health Information
              </Text>
            </View>

            <TextInput
              label="Medical Conditions"
              value={profileData.medical_conditions}
              onChangeText={value => handleInputChange('medical_conditions', value)}
              multiline
              numberOfLines={3}
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />

            <TextInput
              label="Dietary Restrictions"
              value={profileData.dietary_restrictions}
              onChangeText={value => handleInputChange('dietary_restrictions', value)}
              multiline
              numberOfLines={3}
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />
          </Card.Content>
        </Card>

        {/* Preferences */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="settings" size={24} color="#6f42c1" />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>
                Preferences
              </Text>
            </View>

            <View style={styles.preferenceItem}>
              <Text style={[styles.preferenceLabel, {color: colors.text}]}>
                Dark Mode
              </Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                color={colors.primary}
              />
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveButton: {
    padding: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    margin: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 16,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 15,
  },
  halfInput: {
    width: '48%',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  preferenceLabel: {
    fontSize: 16,
  },
});

export default ProfileScreen;
