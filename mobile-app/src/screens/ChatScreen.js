import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Card, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';
import {chatAPI} from '../services/api';

const ChatScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const response = await chatAPI.getChatHistory();
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
      // Add welcome message if no history
      setMessages([
        {
          id: 1,
          text: "Hello! I'm your personal AI trainer. How can I help you with your fitness journey today?",
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage(inputText.trim());
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.message || 'I apologize, but I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'I apologize, but I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.aiMessage,
      ]}>
      <Card
        style={[
          styles.messageCard,
          {
            backgroundColor: item.isUser ? colors.primary : colors.surface,
          },
        ]}>
        <Card.Content style={styles.messageContent}>
          <Text
            style={[
              styles.messageText,
              {
                color: item.isUser ? '#ffffff' : colors.text,
              },
            ]}>
            {item.text}
          </Text>
          <Text
            style={[
              styles.messageTime,
              {
                color: item.isUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
              },
            ]}>
            {new Date(item.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.aiMessage]}>
      <Card style={[styles.messageCard, {backgroundColor: colors.surface}]}>
        <Card.Content style={styles.messageContent}>
          <View style={styles.typingContainer}>
            <Text style={[styles.typingText, {color: colors.textSecondary}]}>
              AI is typing
            </Text>
            <View style={styles.typingDots}>
              <View style={[styles.dot, {backgroundColor: colors.textSecondary}]} />
              <View style={[styles.dot, {backgroundColor: colors.textSecondary}]} />
              <View style={[styles.dot, {backgroundColor: colors.textSecondary}]} />
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header */}
      <LinearGradient
        colors={['#6f42c1', '#8e44ad']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Avatar.Icon
              size={40}
              icon="robot"
              style={styles.avatar}
            />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>AI Trainer</Text>
              <Text style={styles.headerSubtitle}>Always here to help</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="more-vert" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          ListFooterComponent={isLoading ? renderTypingIndicator : null}
        />

        {/* Input */}
        <View style={[styles.inputContainer, {backgroundColor: colors.surface}]}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything about fitness..."
            multiline
            style={[styles.textInput, {color: colors.text}]}
            theme={{
              colors: {
                primary: colors.primary,
                placeholder: colors.textSecondary,
              },
            }}
            right={
              <TextInput.Icon
                icon="send"
                onPress={sendMessage}
                disabled={!inputText.trim() || isLoading}
                style={[
                  styles.sendButton,
                  {
                    backgroundColor: inputText.trim() ? colors.primary : colors.border,
                  },
                ]}
              />
            }
          />
        </View>
      </KeyboardAvoidingView>
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
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerText: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  menuButton: {
    padding: 10,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 15,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageCard: {
    maxWidth: '80%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    fontSize: 14,
    marginRight: 10,
  },
  typingDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    opacity: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    borderRadius: 20,
    padding: 8,
  },
});

export default ChatScreen;
