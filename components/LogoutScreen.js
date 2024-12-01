import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

export default function LogoutScreen() {
  // Funktio kirjautumisen uloskirjaamiseen
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert('Failed to log out: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Logout</Title>

      <Button
        mode="contained"
        onPress={handleLogout} 
        style={styles.logoutButton}
        contentStyle={{ paddingVertical: 10 }}
        icon="logout" 
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#f8f9fa', 
  },
  title: {
    fontSize: 24, 
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#007bff', 
    width: '100%',
    elevation: 5, 
  },
});

