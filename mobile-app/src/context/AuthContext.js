import React, {createContext, useContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../services/api';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {user, token},
        });
      } else {
        dispatch({type: 'LOGIN_FAILURE'});
      }
    } catch (error) {
      console.error('Auth check error:', error);
      dispatch({type: 'LOGIN_FAILURE'});
    }
  };

  const login = async (phoneNumber, password) => {
    try {
      dispatch({type: 'LOGIN_START'});
      
      const response = await api.post('/auth/login/', {
        username: phoneNumber,
        password: password,
      });

      if (response.data.success) {
        const {user, token} = response.data;
        
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {user, token},
        });
        
        return {success: true};
      } else {
        dispatch({type: 'LOGIN_FAILURE'});
        return {success: false, error: response.data.error};
      }
    } catch (error) {
      dispatch({type: 'LOGIN_FAILURE'});
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({type: 'LOGIN_START'});
      
      const response = await api.post('/auth/register/', userData);

      if (response.data.success) {
        return {success: true, message: 'Registration successful'};
      } else {
        dispatch({type: 'LOGIN_FAILURE'});
        return {success: false, error: response.data.error};
      }
    } catch (error) {
      dispatch({type: 'LOGIN_FAILURE'});
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      dispatch({type: 'LOGOUT'});
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData,
    });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
