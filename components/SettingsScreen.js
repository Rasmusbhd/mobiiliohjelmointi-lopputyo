import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, List } from 'react-native-paper';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

export default function SettingsScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The navigation will automatically redirect based on the updated isLoggedIn state
    } catch (error) {
      alert('Failed to log out: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Settings</Title>

      <List.Item
        title="Version"
        description="1.0.0"
        left={() => <List.Icon icon="information" />}
      />

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        contentStyle={{ paddingVertical: 10 }}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    elevation: 5,
  },
});


