import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { firestore, auth } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch favorites from Firestore
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(firestore, 'favorites'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const favoriteSongs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFavorites(favoriteSongs);
      }
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = (id) => {
    // Show confirmation dialog before deleting
    Alert.alert(
      'Delete Favorite',
      'Are you sure you want to delete this song from your favorites?',
      [
        {
          text: 'Cancel', // Cancel the deletion
          style: 'cancel',
        },
        {
          text: 'Yes', // Proceed with deletion
          onPress: async () => {
            try {
              // Get reference to the Firestore document
              const favoriteRef = doc(firestore, 'favorites', id);

              // Delete the document from Firestore
              await deleteDoc(favoriteRef);

              // Remove the deleted favorite from the local state
              setFavorites(favorites.filter((fav) => fav.id !== id));

              // Show success alert
              alert('Favorite deleted successfully!');
            } catch (error) {
              console.error("Error deleting favorite: ", error);
              // Show error alert if deletion fails
              alert('Error deleting favorite');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Refresh function called when user pulls down
  const onRefresh = () => {
    setRefreshing(true);
    fetchFavorites();
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Title>Loading Favorites...</Title>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {favorites.length === 0 ? (
        <Title>No Favorites Found</Title>
      ) : (
        favorites.map((fav) => (
          <Card key={fav.id} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Title style={styles.songTitle}>{fav.song} - {fav.artist}</Title>
                <IconButton
                  icon="delete"
                  size={20}
                  color="red"
                  onPress={() => handleDelete(fav.id)} // Corrected to handleDelete
                  style={styles.deleteIcon}
                />
              </View>
              <Paragraph style={styles.lyricsText}>{fav.lyrics}</Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    padding: 15,
    elevation: 5, // Shadow effect
  },
  cardContent: {
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  songTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  lyricsText: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  deleteIcon: {
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});







