import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { auth } from './firebaseConfig'; // Import the Firebase auth module
import { useNavigation } from '@react-navigation/native';

export default function UserScreen() {
  const navigation = useNavigation();

  // Handle log-out functionality
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase sign-out method
      navigation.replace('Login'); // Redirect to Login screen after logging out
    } catch (error) {
      console.error("Error logging out: ", error);
      alert('Error logging out');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Settings</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
