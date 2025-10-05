import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, ProgressBar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LineChart, BarChart, PieChart} from 'react-native-chart-kit';
import {useTheme} from '../context/ThemeContext';

const {width} = Dimensions.get('window');

const DashboardScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [stats, setStats] = useState({
    weight: 75,
    bmi: 23.5,
    caloriesBurned: 450,
    caloriesConsumed: 1800,
    waterIntake: 6,
    steps: 8500,
    workoutsCompleted: 3,
    weeklyGoal: 5,
  });

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const calorieData = [
    {
      name: 'Breakfast',
      calories: 400,
      color: '#ff9800',
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Lunch',
      calories: 600,
      color: '#4caf50',
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Dinner',
      calories: 500,
      color: '#2196f3',
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Snacks',
      calories: 300,
      color: '#9c27b0',
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header */}
      <LinearGradient
        colors={['#17a2b8', '#20c997']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="more-vert" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, {backgroundColor: colors.surface}]}>
            <Card.Content style={styles.statContent}>
              <Icon name="fitness-center" size={30} color="#ff6b35" />
              <Text style={[styles.statValue, {color: colors.text}]}>
                {stats.workoutsCompleted}/{stats.weeklyGoal}
              </Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Workouts This Week
              </Text>
              <ProgressBar
                progress={stats.workoutsCompleted / stats.weeklyGoal}
                color="#ff6b35"
                style={styles.progressBar}
              />
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, {backgroundColor: colors.surface}]}>
            <Card.Content style={styles.statContent}>
              <Icon name="local-fire-department" size={30} color="#ff6b35" />
              <Text style={[styles.statValue, {color: colors.text}]}>
                {stats.caloriesBurned}
              </Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Calories Burned
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Weight & BMI */}
        <Card style={[styles.chartCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.chartTitle, {color: colors.text}]}>
              Weight & BMI
            </Text>
            <View style={styles.weightContainer}>
              <View style={styles.weightItem}>
                <Text style={[styles.weightValue, {color: colors.text}]}>
                  {stats.weight} kg
                </Text>
                <Text style={[styles.weightLabel, {color: colors.textSecondary}]}>
                  Current Weight
                </Text>
              </View>
              <View style={styles.weightItem}>
                <Text style={[styles.weightValue, {color: colors.text}]}>
                  {stats.bmi}
                </Text>
                <Text style={[styles.weightLabel, {color: colors.textSecondary}]}>
                  BMI
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Weekly Progress Chart */}
        <Card style={[styles.chartCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.chartTitle, {color: colors.text}]}>
              Weekly Progress
            </Text>
            <LineChart
              data={weeklyData}
              width={width - 80}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Calorie Breakdown */}
        <Card style={[styles.chartCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.chartTitle, {color: colors.text}]}>
              Calorie Breakdown
            </Text>
            <PieChart
              data={calorieData}
              width={width - 80}
              height={220}
              chartConfig={chartConfig}
              accessor="calories"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Daily Goals */}
        <Card style={[styles.goalsCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.chartTitle, {color: colors.text}]}>
              Daily Goals
            </Text>
            
            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Icon name="local-fire-department" size={20} color="#ff6b35" />
                <Text style={[styles.goalLabel, {color: colors.text}]}>
                  Calories Burned
                </Text>
              </View>
              <Text style={[styles.goalValue, {color: colors.text}]}>
                {stats.caloriesBurned}/500
              </Text>
              <ProgressBar
                progress={stats.caloriesBurned / 500}
                color="#ff6b35"
                style={styles.goalProgress}
              />
            </View>

            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Icon name="opacity" size={20} color="#17a2b8" />
                <Text style={[styles.goalLabel, {color: colors.text}]}>
                  Water Intake
                </Text>
              </View>
              <Text style={[styles.goalValue, {color: colors.text}]}>
                {stats.waterIntake}/8 glasses
              </Text>
              <ProgressBar
                progress={stats.waterIntake / 8}
                color="#17a2b8"
                style={styles.goalProgress}
              />
            </View>

            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Icon name="directions-walk" size={20} color="#28a745" />
                <Text style={[styles.goalLabel, {color: colors.text}]}>
                  Steps
                </Text>
              </View>
              <Text style={[styles.goalValue, {color: colors.text}]}>
                {stats.steps.toLocaleString()}/10,000
              </Text>
              <ProgressBar
                progress={stats.steps / 10000}
                color="#28a745"
                style={styles.goalProgress}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Recent Achievements */}
        <Card style={[styles.achievementsCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.chartTitle, {color: colors.text}]}>
              Recent Achievements
            </Text>
            
            <View style={styles.achievementItem}>
              <Icon name="emoji-events" size={24} color="#ffc107" />
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, {color: colors.text}]}>
                  First Workout Complete!
                </Text>
                <Text style={[styles.achievementDate, {color: colors.textSecondary}]}>
                  2 days ago
                </Text>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <Icon name="local-fire-department" size={24} color="#ff6b35" />
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, {color: colors.text}]}>
                  Burned 500 Calories
                </Text>
                <Text style={[styles.achievementDate, {color: colors.textSecondary}]}>
                  1 day ago
                </Text>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <Icon name="fitness-center" size={24} color="#28a745" />
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, {color: colors.text}]}>
                  Weekly Goal Achieved
                </Text>
                <Text style={[styles.achievementDate, {color: colors.textSecondary}]}>
                  3 days ago
                </Text>
              </View>
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
  menuButton: {
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 4,
  },
  chartCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  weightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weightItem: {
    alignItems: 'center',
  },
  weightValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weightLabel: {
    fontSize: 14,
  },
  goalsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  goalItem: {
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  goalValue: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'right',
  },
  goalProgress: {
    height: 6,
    borderRadius: 3,
  },
  achievementsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementText: {
    marginLeft: 15,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 12,
  },
});

export default DashboardScreen;
