import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Avatar, Title } from 'react-native-paper';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // No need to manually navigate, `onAuthStateChanged` will trigger the appropriate screen
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* App Logo and Title */}
      <Avatar.Icon size={100} icon="music" style={styles.logo} />
      <Title style={styles.title}>SongLyrics App</Title>

      {/* Input Fields */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      
      {/* Error Message */}
      {error && <Text style={styles.error}>{error}</Text>}
      
      {/* Login Button */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        icon="login" // Icon added to the button
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    backgroundColor: '#007bff',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});







