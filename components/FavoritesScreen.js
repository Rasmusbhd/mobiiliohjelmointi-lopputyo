import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { Card, Title, Paragraph, IconButton, Menu, Divider, TextInput } from 'react-native-paper';
import { firestore, auth } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]); 
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortOption, setSortOption] = useState('song');

  // Funktio hakee käyttäjän suosikit Firestoresta
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
        setFilteredFavorites(favoriteSongs); 
      }
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    } finally {
      setLoading(false); 
      setRefreshing(false);
    }
  };

  // Suodattaa suosikit hakutermin perusteella
  const handleSearch = (query) => {
    setSearchQuery(query); 
    const filtered = favorites.filter((fav) => {
      return (
        fav.song.toLowerCase().includes(query.toLowerCase()) || 
        fav.artist.toLowerCase().includes(query.toLowerCase())  
      );
    });
    setFilteredFavorites(filtered); 
  };

  // Järjestää suosikit valitun järjestelyvaihtoehdon mukaan
  const handleSort = (option) => {
    setSortOption(option); 
    setSortMenuVisible(false); 

    const sortedFavorites = [...filteredFavorites].sort((a, b) => {
      if (option === 'song') {
        return a.song.localeCompare(b.song);
      } else if (option === 'artist') {
        return a.artist.localeCompare(b.artist); 
      }
    });

    setFilteredFavorites(sortedFavorites); 
  };

  // Poistaa suosikin Firestoresta ja tilasta
  const handleDelete = (id) => {
    Alert.alert(
      'Delete Favorite', 
      'Are you sure you want to delete this song from your favorites?',
      [
        {
          text: 'Cancel', 
          style: 'cancel',
        },
        {
          text: 'Yes', 
          onPress: async () => {
            try {
              const favoriteRef = doc(firestore, 'favorites', id); 
              await deleteDoc(favoriteRef); 
              setFavorites(favorites.filter((fav) => fav.id !== id)); 
              setFilteredFavorites(filteredFavorites.filter((fav) => fav.id !== id));
              alert('Favorite deleted successfully!'); 
            } catch (error) {
              console.error("Error deleting favorite: ", error);
              alert('Error deleting favorite'); 
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Kutsutaan, kun käyttäjä vetää alas päivittääkseen listan
  const onRefresh = () => {
    setRefreshing(true); 
    fetchFavorites(); 
    handleSearch(''); 
  };

  // Haetaan suosikit ensimmäisellä kerralla, kun komponentti ladataan
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
      <TextInput
        label="Search Favorites"
        value={searchQuery}
        onChangeText={handleSearch}
        mode="outlined"
        placeholder="Search by Song or Artist"
        style={styles.searchInput}
      />
      <Menu
        visible={sortMenuVisible}
        onDismiss={() => setSortMenuVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setSortMenuVisible(true)}>
            <Text style={styles.sortText}>Sort By: {sortOption === 'song' ? 'Song Title' : 'Artist'}</Text>
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => handleSort('song')} title="Sort by Song Title" />
        <Divider />
        <Menu.Item onPress={() => handleSort('artist')} title="Sort by Artist" />
      </Menu>

      {filteredFavorites.length === 0 ? (
        <Title>No Favorites Found</Title>
      ) : (
        filteredFavorites.map((fav) => (
          <Card key={fav.id} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Title style={styles.songTitle}>{fav.song} - {fav.artist}</Title>
                <IconButton
                  icon="delete"
                  size={20}
                  color="red"
                  onPress={() => handleDelete(fav.id)} 
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sortText: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 15,
    marginBottom: 15,
  },
  card: {
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: '#E6F0FF',
    padding: 15,
    elevation: 4,
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
    color: '#333',
  },
  lyricsText: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    lineHeight: 20,
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












