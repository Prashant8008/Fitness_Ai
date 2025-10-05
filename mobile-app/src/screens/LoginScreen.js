import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {login} = useAuth();
  const {colors} = useTheme();

  const handleLogin = async () => {
    if (!phoneNumber.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(phoneNumber.trim(), password);
      
      if (result.success) {
        // Navigation will be handled by AuthContext
      } else {
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Icon name="fitness-center" size={60} color="#ffffff" />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your Fitness AI account</Text>
          </View>

          {/* Login Form */}
          <Card style={[styles.card, {backgroundColor: colors.surface}]}>
            <Card.Content style={styles.cardContent}>
              <Text style={[styles.formTitle, {color: colors.text}]}>
                Sign In
              </Text>

              {/* Phone Number Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  label="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  mode="outlined"
                  keyboardType="phone-pad"
                  left={<TextInput.Icon icon="phone" />}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                    },
                  }}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                    },
                  }}
                />
              </View>

              {/* Login Button */}
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={[styles.loginButton, {backgroundColor: colors.primary}]}
                contentStyle={styles.buttonContent}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={[styles.registerText, {color: colors.textSecondary}]}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.registerLink, {color: colors.primary}]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Why Choose Fitness AI?</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Icon name="schedule" size={24} color="#ffffff" />
                <Text style={styles.featureText}>Personalized Workouts</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="restaurant" size={24} color="#ffffff" />
                <Text style={styles.featureText}>Meal Planning</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="trending-up" size={24} color="#ffffff" />
                <Text style={styles.featureText}>Progress Tracking</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 30,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'transparent',
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 25,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
  },
  registerLink: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default LoginScreen;
