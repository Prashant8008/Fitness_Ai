import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Button, TextInput, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';

const WorkoutScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [selectedType, setSelectedType] = useState('cardio');
  const [workoutData, setWorkoutData] = useState({
    name: '',
    duration: '',
    notes: '',
  });

  const workoutTypes = [
    {id: 'cardio', name: 'Cardio', icon: 'directions-run', color: '#ff6b35'},
    {id: 'strength', name: 'Strength', icon: 'fitness-center', color: '#28a745'},
    {id: 'yoga', name: 'Yoga', icon: 'self-improvement', color: '#6f42c1'},
    {id: 'pilates', name: 'Pilates', icon: 'accessibility', color: '#17a2b8'},
    {id: 'swimming', name: 'Swimming', icon: 'pool', color: '#20c997'},
    {id: 'cycling', name: 'Cycling', icon: 'pedal-bike', color: '#fd7e14'},
  ];

  const handleInputChange = (field, value) => {
    setWorkoutData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!workoutData.name.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }
    
    Alert.alert(
      'Workout Saved',
      'Your workout has been added to your schedule!',
      [{text: 'OK', onPress: () => navigation.goBack()}]
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header */}
      <LinearGradient
        colors={['#ff6b35', '#f7931e']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Workout</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        {/* Workout Type Selection */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Workout Type
            </Text>
            <View style={styles.typeGrid}>
              {workoutTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeItem,
                    {
                      backgroundColor: selectedType === type.id ? type.color : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedType(type.id)}>
                  <Icon
                    name={type.icon}
                    size={24}
                    color={selectedType === type.id ? '#ffffff' : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color: selectedType === type.id ? '#ffffff' : colors.textSecondary,
                      },
                    ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Workout Details */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Workout Details
            </Text>

            <TextInput
              label="Workout Name"
              value={workoutData.name}
              onChangeText={value => handleInputChange('name', value)}
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />

            <TextInput
              label="Duration (minutes)"
              value={workoutData.duration}
              onChangeText={value => handleInputChange('duration', value)}
              keyboardType="numeric"
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />

            <TextInput
              label="Notes (optional)"
              value={workoutData.notes}
              onChangeText={value => handleInputChange('notes', value)}
              multiline
              numberOfLines={3}
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />
          </Card.Content>
        </Card>

        {/* Quick Workouts */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Quick Workouts
            </Text>
            
            <View style={styles.quickWorkouts}>
              <TouchableOpacity style={styles.quickWorkoutItem}>
                <Icon name="directions-run" size={24} color="#ff6b35" />
                <Text style={[styles.quickWorkoutText, {color: colors.text}]}>
                  15-min Cardio Blast
                </Text>
                <Text style={[styles.quickWorkoutTime, {color: colors.textSecondary}]}>
                  15 min
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickWorkoutItem}>
                <Icon name="fitness-center" size={24} color="#28a745" />
                <Text style={[styles.quickWorkoutText, {color: colors.text}]}>
                  Full Body Strength
                </Text>
                <Text style={[styles.quickWorkoutTime, {color: colors.textSecondary}]}>
                  30 min
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickWorkoutItem}>
                <Icon name="self-improvement" size={24} color="#6f42c1" />
                <Text style={[styles.quickWorkoutText, {color: colors.text}]}>
                  Morning Yoga Flow
                </Text>
                <Text style={[styles.quickWorkoutTime, {color: colors.textSecondary}]}>
                  20 min
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Workout Tips */}
        <Card style={[styles.tipsCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Icon name="lightbulb" size={24} color="#ffc107" />
              <Text style={[styles.tipTitle, {color: colors.text}]}>
                Workout Tips
              </Text>
            </View>
            <Text style={[styles.tipText, {color: colors.textSecondary}]}>
              • Warm up for 5-10 minutes before starting{'\n'}
              • Stay hydrated throughout your workout{'\n'}
              • Cool down and stretch after exercising{'\n'}
              • Listen to your body and rest when needed
            </Text>
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
  sectionCard: {
    margin: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  quickWorkouts: {
    marginTop: 10,
  },
  quickWorkoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quickWorkoutText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  quickWorkoutTime: {
    fontSize: 14,
  },
  tipsCard: {
    margin: 20,
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
});

export default WorkoutScreen;
