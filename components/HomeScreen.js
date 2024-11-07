import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { firestore, auth } from './firebaseConfig';

export default function HomeScreen() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');

  const fetchLyrics = async () => {
    try {
      const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      setLyrics(response.data.lyrics || 'Lyrics not found.');
    } catch (error) {
      setLyrics('Lyrics not found or an error occurred.');
    }
  };

  const addToFavorites = async () => {
    const user = auth.currentUser;
    if (user && lyrics) {
      try {
        await firestore.collection('favorites').add({
          userId: user.uid,
          artist,
          song,
          lyrics,
        });
        alert('Song added to favorites!');
      } catch (error) {
        alert('Error adding to favorites: ' + error.message);
      }
    } else {
      alert('Please fetch lyrics before adding to favorites.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Music Lyrics Finder</Title>

      <TextInput
        label="Artist"
        value={artist}
        onChangeText={setArtist}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: '#6200ea' } }}
      />
      
      <TextInput
        label="Song Title"
        value={song}
        onChangeText={setSong}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: '#6200ea' } }}
      />
      
      <Button
        mode="contained"
        onPress={fetchLyrics}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
        theme={{ colors: { primary: '#6200ea' } }}
      >
        Search Lyrics
      </Button>

      <Button
        mode="contained"
        onPress={addToFavorites}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
        theme={{ colors: { primary: '#6200ea' } }}
        disabled={!lyrics}
      >
        Add to Favorites
      </Button>
      
      {lyrics ? (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Lyrics</Title>
            <Paragraph>{lyrics}</Paragraph>
          </Card.Content>
        </Card>
      ) : null}
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  card: {
    marginTop: 20,
    padding: 10,
    width: '100%',
  },
});





