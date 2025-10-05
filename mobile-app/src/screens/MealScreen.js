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

const MealScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [mealData, setMealData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    notes: '',
  });

  const mealTypes = [
    {id: 'breakfast', name: 'Breakfast', icon: 'free-breakfast', color: '#ff9800'},
    {id: 'lunch', name: 'Lunch', icon: 'lunch-dining', color: '#4caf50'},
    {id: 'dinner', name: 'Dinner', icon: 'dinner-dining', color: '#2196f3'},
    {id: 'snack1', name: 'Snack 1', icon: 'local-cafe', color: '#9c27b0'},
    {id: 'snack2', name: 'Snack 2', icon: 'local-cafe', color: '#9c27b0'},
    {id: 'snack3', name: 'Snack 3', icon: 'local-cafe', color: '#9c27b0'},
  ];

  const handleInputChange = (field, value) => {
    setMealData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!mealData.name.trim()) {
      Alert.alert('Error', 'Please enter a meal name');
      return;
    }
    
    Alert.alert(
      'Meal Saved',
      'Your meal has been added to your plan!',
      [{text: 'OK', onPress: () => navigation.goBack()}]
    );
  };

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
          <Text style={styles.headerTitle}>Add Meal</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        {/* Meal Type Selection */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Meal Type
            </Text>
            <View style={styles.typeGrid}>
              {mealTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeItem,
                    {
                      backgroundColor: selectedMealType === type.id ? type.color : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedMealType(type.id)}>
                  <Icon
                    name={type.icon}
                    size={24}
                    color={selectedMealType === type.id ? '#ffffff' : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color: selectedMealType === type.id ? '#ffffff' : colors.textSecondary,
                      },
                    ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Meal Details */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Meal Details
            </Text>

            <TextInput
              label="Meal Name"
              value={mealData.name}
              onChangeText={value => handleInputChange('name', value)}
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />

            <View style={styles.macroRow}>
              <TextInput
                label="Calories"
                value={mealData.calories}
                onChangeText={value => handleInputChange('calories', value)}
                keyboardType="numeric"
                style={[styles.input, styles.halfInput]}
                theme={{colors: {primary: colors.primary}}}
              />
              <TextInput
                label="Protein (g)"
                value={mealData.protein}
                onChangeText={value => handleInputChange('protein', value)}
                keyboardType="numeric"
                style={[styles.input, styles.halfInput]}
                theme={{colors: {primary: colors.primary}}}
              />
            </View>

            <View style={styles.macroRow}>
              <TextInput
                label="Carbs (g)"
                value={mealData.carbs}
                onChangeText={value => handleInputChange('carbs', value)}
                keyboardType="numeric"
                style={[styles.input, styles.halfInput]}
                theme={{colors: {primary: colors.primary}}}
              />
              <TextInput
                label="Fats (g)"
                value={mealData.fats}
                onChangeText={value => handleInputChange('fats', value)}
                keyboardType="numeric"
                style={[styles.input, styles.halfInput]}
                theme={{colors: {primary: colors.primary}}}
              />
            </View>

            <TextInput
              label="Notes (optional)"
              value={mealData.notes}
              onChangeText={value => handleInputChange('notes', value)}
              multiline
              numberOfLines={3}
              style={styles.input}
              theme={{colors: {primary: colors.primary}}}
            />
          </Card.Content>
        </Card>

        {/* Quick Meals */}
        <Card style={[styles.sectionCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Quick Meals
            </Text>
            
            <View style={styles.quickMeals}>
              <TouchableOpacity style={styles.quickMealItem}>
                <Icon name="free-breakfast" size={24} color="#ff9800" />
                <Text style={[styles.quickMealText, {color: colors.text}]}>
                  Oatmeal with Berries
                </Text>
                <Text style={[styles.quickMealCalories, {color: colors.textSecondary}]}>
                  350 cal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickMealItem}>
                <Icon name="lunch-dining" size={24} color="#4caf50" />
                <Text style={[styles.quickMealText, {color: colors.text}]}>
                  Grilled Chicken Salad
                </Text>
                <Text style={[styles.quickMealCalories, {color: colors.textSecondary}]}>
                  450 cal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickMealItem}>
                <Icon name="dinner-dining" size={24} color="#2196f3" />
                <Text style={[styles.quickMealText, {color: colors.text}]}>
                  Salmon & Vegetables
                </Text>
                <Text style={[styles.quickMealCalories, {color: colors.textSecondary}]}>
                  500 cal
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Nutrition Tips */}
        <Card style={[styles.tipsCard, {backgroundColor: colors.surface}]}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Icon name="lightbulb" size={24} color="#ffc107" />
              <Text style={[styles.tipTitle, {color: colors.text}]}>
                Nutrition Tips
              </Text>
            </View>
            <Text style={[styles.tipText, {color: colors.textSecondary}]}>
              • Include protein in every meal{'\n'}
              • Eat plenty of fruits and vegetables{'\n'}
              • Stay hydrated with water{'\n'}
              • Plan your meals ahead of time{'\n'}
              • Practice portion control
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
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  quickMeals: {
    marginTop: 10,
  },
  quickMealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quickMealText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  quickMealCalories: {
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

export default MealScreen;
