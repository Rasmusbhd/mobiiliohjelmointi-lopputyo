import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Avatar, Title } from 'react-native-paper';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null); 

  // Funktio kirjautumisen käsittelemiseksi
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError('Invalid login information');
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon size={100} icon="music" style={styles.logo} />
      <Title style={styles.title}>SongLyrics App</Title>

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

      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        mode="contained"
        onPress={handleLogin} 
        style={styles.button}
        icon="login"
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
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
    backgroundColor: '#007bff', 
    width: '100%',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});









