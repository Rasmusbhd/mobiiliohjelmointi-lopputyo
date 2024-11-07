import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { firestore, auth } from './firebaseConfig'; 

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await firestore.collection('favorites').where('userId', '==', user.uid).get();
        setFavorites(snapshot.docs.map(doc => doc.data()));
      }
    };
    fetchFavorites();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favorites.length === 0 ? (
        <Title>No Favorites Found</Title>
      ) : (
        favorites.map((fav, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Title>{fav.song} - {fav.artist}</Title>
              <Paragraph>{fav.lyrics}</Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    marginVertical: 10,
  },
});


