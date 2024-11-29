import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import axios from 'axios';
import { firestore, auth } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function HomeScreen() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLyrics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      setLyrics(response.data.lyrics || 'Lyrics not found.');
    } catch (error) {
      setLyrics('Lyrics not found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async () => {
    const user = auth.currentUser;
    if (user && lyrics) {
      try {
        await addDoc(collection(firestore, 'favorites'), { userId: user.uid, artist, song, lyrics });
        alert('Song added to favorites!');
        
        // Clear input fields and lyrics after adding to favorites
        setArtist('');
        setSong('');
        setLyrics('');
      } catch (error) {
        alert('Error adding to favorites: ' + error.message);
      }
    } else {
      alert('Please fetch lyrics first.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Logo and Title */}
      <Avatar.Icon size={100} icon="music" style={styles.logo} />
      <Title style={styles.title}>SongLyrics App</Title>

      {/* Input Fields */}
      <TextInput
        label="Artist"
        value={artist}
        onChangeText={setArtist}
        mode="outlined"
        style={styles.input}
        autoCapitalize="words" // Automatically capitalize first letter
      />
      <TextInput
        label="Song Title"
        value={song}
        onChangeText={setSong}
        mode="outlined"
        style={styles.input}
        autoCapitalize="words" // Automatically capitalize first letter
      />

      {/* Buttons */}
      <Button
        mode="contained"
        onPress={fetchLyrics}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Search Lyrics
      </Button>

      <Button
        mode="contained"
        onPress={addToFavorites}
        style={styles.button}
        disabled={!lyrics}
      >
        Add to Favorites
      </Button>

      {/* Display Lyrics */}
      {lyrics ? (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Lyrics</Title>
            <Paragraph>{lyrics}</Paragraph>
          </Card.Content>
        </Card>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Ensures the content can grow and be scrollable when needed
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#007bff',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#007bff',
  },
  card: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
});











