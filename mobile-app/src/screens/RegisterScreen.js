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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

const RegisterScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    phone_number: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {register} = useAuth();
  const {colors} = useTheme();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const {phone_number, password, confirm_password} = formData;
    
    if (!phone_number.trim()) {
      Alert.alert('Error', 'Phone number is required');
      return false;
    }
    
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return false;
    }
    
    if (password !== confirm_password) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await register(formData);
      
      if (result.success) {
        Alert.alert(
          'Success',
          'Account created successfully! Please sign in.',
          [{text: 'OK', onPress: () => navigation.navigate('Login')}]
        );
      } else {
        Alert.alert('Registration Failed', result.error || 'Something went wrong');
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
              <Icon name="person-add" size={60} color="#ffffff" />
            </View>
            <Text style={styles.title}>Join Fitness AI</Text>
            <Text style={styles.subtitle}>Start your personalized fitness journey</Text>
          </View>

          {/* Registration Form */}
          <Card style={[styles.card, {backgroundColor: colors.surface}]}>
            <Card.Content style={styles.cardContent}>
              <Text style={[styles.formTitle, {color: colors.text}]}>
                Create Account
              </Text>

              {/* Phone Number */}
              <View style={styles.inputContainer}>
                <TextInput
                  label="Phone Number *"
                  value={formData.phone_number}
                  onChangeText={value => handleInputChange('phone_number', value)}
                  mode="outlined"
                  keyboardType="phone-pad"
                  left={<TextInput.Icon icon="phone" />}
                  style={styles.input}
                  theme={{colors: {primary: colors.primary}}}
                />
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <TextInput
                  label="Email Address"
                  value={formData.email}
                  onChangeText={value => handleInputChange('email', value)}
                  mode="outlined"
                  keyboardType="email-address"
                  left={<TextInput.Icon icon="email" />}
                  style={styles.input}
                  theme={{colors: {primary: colors.primary}}}
                />
              </View>

              {/* First Name */}
              <View style={styles.inputContainer}>
                <TextInput
                  label="First Name"
                  value={formData.first_name}
                  onChangeText={value => handleInputChange('first_name', value)}
                  mode="outlined"
                  left={<TextInput.Icon icon="person" />}
                  style={styles.input}
                  theme={{colors: {primary: colors.primary}}}
                />
              </View>

              {/* Last Name */}
              <View style={styles.inputContainer}>
                <TextInput
                  label="Last Name"
                  value={formData.last_name}
                  onChangeText={value => handleInputChange('last_name', value)}
                  mode="outlined"
                  left={<TextInput.Icon icon="person" />}
                  style={styles.input}
                  theme={{colors: {primary: colors.primary}}}
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <TextInput
                  label="Password *"
                  value={formData.password}
                  onChangeText={value => handleInputChange('password', value)}
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
                  theme={{colors: {primary: colors.primary}}}
                />
                <Text style={[styles.helpText, {color: colors.textSecondary}]}>
                  At least 8 characters long
                </Text>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <TextInput
                  label="Confirm Password *"
                  value={formData.confirm_password}
                  onChangeText={value => handleInputChange('confirm_password', value)}
                  mode="outlined"
                  secureTextEntry={!showConfirmPassword}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  }
                  style={styles.input}
                  theme={{colors: {primary: colors.primary}}}
                />
              </View>

              {/* Register Button */}
              <Button
                mode="contained"
                onPress={handleRegister}
                loading={isLoading}
                disabled={isLoading}
                style={[styles.registerButton, {backgroundColor: colors.primary}]}
                contentStyle={styles.buttonContent}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={[styles.loginText, {color: colors.textSecondary}]}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.loginLink, {color: colors.primary}]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
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
    marginBottom: 30,
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
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'transparent',
  },
  helpText: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  registerButton: {
    marginTop: 20,
    borderRadius: 25,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
