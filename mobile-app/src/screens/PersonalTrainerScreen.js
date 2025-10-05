import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Chip, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';
import {workoutAPI, mealAPI} from '../services/api';

const PersonalTrainerScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [todayMeals, setTodayMeals] = useState([]);
  const [selectedTab, setSelectedTab] = useState('today');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load today's workouts and meals
      const workoutsResponse = await workoutAPI.getWorkouts();
      const mealsResponse = await mealAPI.getMeals();
      
      // Filter for today's items
      const today = new Date().toISOString().split('T')[0];
      const todayWorkoutsData = workoutsResponse.data.filter(
        workout => workout.scheduled_date === today
      );
      const todayMealsData = mealsResponse.data.filter(
        meal => meal.scheduled_date === today
      );
      
      setTodayWorkouts(todayWorkoutsData);
      setTodayMeals(todayMealsData);
    } catch (error) {
      console.error('Error loading data:', error);
      // For demo purposes, create sample data
      createSampleData();
    }
  };

  const createSampleData = () => {
    const sampleWorkouts = [
      {
        id: 1,
        workout_name: 'Morning Cardio',
        scheduled_time: '07:00',
        duration_minutes: 30,
        workout_type: 'Cardio',
        is_completed: false,
      },
      {
        id: 2,
        workout_name: 'Strength Training',
        scheduled_time: '18:00',
        duration_minutes: 45,
        workout_type: 'Strength',
        is_completed: true,
      },
    ];

    const sampleMeals = [
      {
        id: 1,
        meal_name: 'Protein Oatmeal',
        meal_type: 'breakfast',
        scheduled_time: '08:00',
        calories: 350,
        is_consumed: true,
      },
      {
        id: 2,
        meal_name: 'Grilled Chicken Salad',
        meal_type: 'lunch',
        scheduled_time: '13:00',
        calories: 450,
        is_consumed: false,
      },
      {
        id: 3,
        meal_name: 'Salmon & Vegetables',
        meal_type: 'dinner',
        scheduled_time: '19:00',
        calories: 500,
        is_consumed: false,
      },
    ];

    setTodayWorkouts(sampleWorkouts);
    setTodayMeals(sampleMeals);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleWorkoutComplete = async (workoutId) => {
    try {
      await workoutAPI.markComplete(workoutId);
      setTodayWorkouts(prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {...workout, is_completed: true}
            : workout
        )
      );
      Alert.alert('Success', 'Workout marked as completed!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update workout status');
    }
  };

  const handleMealConsumed = async (mealId) => {
    try {
      await mealAPI.markConsumed(mealId);
      setTodayMeals(prev =>
        prev.map(meal =>
          meal.id === mealId ? {...meal, is_consumed: true} : meal
        )
      );
      Alert.alert('Success', 'Meal marked as consumed!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update meal status');
    }
  };

  const getMealTypeIcon = (mealType) => {
    const icons = {
      breakfast: 'free-breakfast',
      lunch: 'lunch-dining',
      dinner: 'dinner-dining',
      snack1: 'local-cafe',
      snack2: 'local-cafe',
      snack3: 'local-cafe',
    };
    return icons[mealType] || 'restaurant';
  };

  const getMealTypeColor = (mealType) => {
    const colors = {
      breakfast: '#ff9800',
      lunch: '#4caf50',
      dinner: '#2196f3',
      snack1: '#9c27b0',
      snack2: '#9c27b0',
      snack3: '#9c27b0',
    };
    return colors[mealType] || '#666';
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
          <Text style={styles.headerTitle}>Personal Trainer</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Icon name="settings" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'today' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('today')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'today' && styles.activeTabText,
              ]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'week' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('week')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'week' && styles.activeTabText,
              ]}>
              This Week
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Schedule */}
        {selectedTab === 'today' && (
          <>
            {/* Workouts Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon name="fitness-center" size={24} color="#ff6b35" />
                <Text style={[styles.sectionTitle, {color: colors.text}]}>
                  Today's Workouts
                </Text>
                <Text style={[styles.sectionCount, {color: colors.textSecondary}]}>
                  {todayWorkouts.length}
                </Text>
              </View>

              {todayWorkouts.length > 0 ? (
                todayWorkouts.map(workout => (
                  <Card
                    key={workout.id}
                    style={[
                      styles.workoutCard,
                      {
                        backgroundColor: colors.surface,
                        borderLeftColor: workout.is_completed ? '#28a745' : '#ff6b35',
                      },
                    ]}>
                    <Card.Content style={styles.workoutContent}>
                      <View style={styles.workoutInfo}>
                        <Text style={[styles.workoutTime, {color: colors.text}]}>
                          {workout.scheduled_time}
                        </Text>
                        <Text style={[styles.workoutName, {color: colors.text}]}>
                          {workout.workout_name}
                        </Text>
                        <Text style={[styles.workoutType, {color: colors.textSecondary}]}>
                          {workout.workout_type} • {workout.duration_minutes} min
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.statusButton,
                          {
                            backgroundColor: workout.is_completed
                              ? '#28a745'
                              : '#ff6b35',
                          },
                        ]}
                        onPress={() => handleWorkoutComplete(workout.id)}>
                        <Icon
                          name={workout.is_completed ? 'check' : 'play-arrow'}
                          size={20}
                          color="#ffffff"
                        />
                      </TouchableOpacity>
                    </Card.Content>
                  </Card>
                ))
              ) : (
                <Card style={[styles.emptyCard, {backgroundColor: colors.surface}]}>
                  <Card.Content style={styles.emptyContent}>
                    <Icon name="fitness-center" size={48} color={colors.textSecondary} />
                    <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
                      No workouts scheduled for today
                    </Text>
                    <TouchableOpacity
                      style={[styles.addButton, {backgroundColor: colors.primary}]}
                      onPress={() => navigation.navigate('Workout')}>
                      <Text style={styles.addButtonText}>Add Workout</Text>
                    </TouchableOpacity>
                  </Card.Content>
                </Card>
              )}
            </View>

            {/* Meals Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon name="restaurant" size={24} color="#28a745" />
                <Text style={[styles.sectionTitle, {color: colors.text}]}>
                  Today's Meals
                </Text>
                <Text style={[styles.sectionCount, {color: colors.textSecondary}]}>
                  {todayMeals.length}
                </Text>
              </View>

              {todayMeals.length > 0 ? (
                todayMeals.map(meal => (
                  <Card
                    key={meal.id}
                    style={[
                      styles.mealCard,
                      {
                        backgroundColor: colors.surface,
                        borderLeftColor: meal.is_consumed ? '#28a745' : '#ff6b35',
                      },
                    ]}>
                    <Card.Content style={styles.mealContent}>
                      <View style={styles.mealInfo}>
                        <Text style={[styles.mealTime, {color: colors.text}]}>
                          {meal.scheduled_time}
                        </Text>
                        <Text style={[styles.mealName, {color: colors.text}]}>
                          {meal.meal_name}
                        </Text>
                        <View style={styles.mealDetails}>
                          <Chip
                            icon={getMealTypeIcon(meal.meal_type)}
                            style={[
                              styles.mealTypeChip,
                              {backgroundColor: getMealTypeColor(meal.meal_type)},
                            ]}
                            textStyle={styles.chipText}>
                            {meal.meal_type.charAt(0).toUpperCase() + meal.meal_type.slice(1)}
                          </Chip>
                          <Text style={[styles.mealCalories, {color: colors.textSecondary}]}>
                            {meal.calories} cal
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.statusButton,
                          {
                            backgroundColor: meal.is_consumed ? '#28a745' : '#ff6b35',
                          },
                        ]}
                        onPress={() => handleMealConsumed(meal.id)}>
                        <Icon
                          name={meal.is_consumed ? 'check' : 'restaurant'}
                          size={20}
                          color="#ffffff"
                        />
                      </TouchableOpacity>
                    </Card.Content>
                  </Card>
                ))
              ) : (
                <Card style={[styles.emptyCard, {backgroundColor: colors.surface}]}>
                  <Card.Content style={styles.emptyContent}>
                    <Icon name="restaurant" size={48} color={colors.textSecondary} />
                    <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
                      No meals planned for today
                    </Text>
                    <TouchableOpacity
                      style={[styles.addButton, {backgroundColor: colors.primary}]}
                      onPress={() => navigation.navigate('Meal')}>
                      <Text style={styles.addButtonText}>Add Meal</Text>
                    </TouchableOpacity>
                  </Card.Content>
                </Card>
              )}
            </View>
          </>
        )}

        {/* Week View */}
        {selectedTab === 'week' && (
          <Card style={[styles.weekCard, {backgroundColor: colors.surface}]}>
            <Card.Content>
              <Text style={[styles.weekTitle, {color: colors.text}]}>
                This Week's Schedule
              </Text>
              <Text style={[styles.weekSubtitle, {color: colors.textSecondary}]}>
                Coming soon! Track your weekly progress and plan ahead.
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        style={[styles.fab, {backgroundColor: colors.primary}]}
        icon="add"
        onPress={() => {
          // Show action sheet to choose between workout and meal
          Alert.alert(
            'Add New',
            'What would you like to add?',
            [
              {text: 'Workout', onPress: () => navigation.navigate('Workout')},
              {text: 'Meal', onPress: () => navigation.navigate('Meal')},
              {text: 'Cancel', style: 'cancel'},
            ]
          );
        }}
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
  settingsButton: {
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#ff6b35',
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  sectionCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutCard: {
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  workoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6b35',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5,
  },
  workoutType: {
    fontSize: 14,
  },
  mealCard: {
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mealContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  mealInfo: {
    flex: 1,
  },
  mealTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6b35',
  },
  mealName: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5,
  },
  mealDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealTypeChip: {
    marginRight: 10,
  },
  chipText: {
    color: '#ffffff',
    fontSize: 12,
  },
  mealCalories: {
    fontSize: 14,
  },
  statusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCard: {
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    marginVertical: 15,
    textAlign: 'center',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  weekCard: {
    margin: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weekSubtitle: {
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

export default PersonalTrainerScreen;
