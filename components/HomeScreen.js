import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Text, Avatar, Button } from 'react-native-paper';
import { auth } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const user = auth.currentUser; // Hakee nykyisen kirjautuneen käyttäjän Firebasesta
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={40} icon="account" style={styles.avatar} /> 
        <Text style={styles.userInfo}>Logged in as: {user?.email}</Text>
      </View>

      <Avatar.Icon size={100} icon="music" style={styles.logo} />

      <Title style={styles.welcome}>Welcome to SongLyrics App!</Title> 

      <Button
        icon="magnify"
        mode="contained"
        onPress={() => navigation.navigate('Search')} 
        style={styles.button}
      >
        Search Songs
      </Button>
      <Button
        icon="heart"
        mode="contained"
        onPress={() => navigation.navigate('Favorites')} 
        style={styles.button}
      >
        View Favorites
      </Button>
      <Button
        icon="logout"
        mode="contained"
        onPress={() => navigation.navigate('Logout')} 
        style={styles.button}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20, 
  },
  avatar: {
    backgroundColor: '#007bff',
    marginRight: 10,
  },
  userInfo: {
    fontSize: 16,
    color: '#333',
  },
  logo: {
    backgroundColor: '#007bff',
    alignSelf: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#007bff',
  },
});















