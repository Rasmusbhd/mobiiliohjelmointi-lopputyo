import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';
import LoginScreen from './LoginScreen';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);  // User is logged in
      } else {
        setIsLoggedIn(false);  // User is not logged in
      }
    });
    return unsubscribe;
  }, []);

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          {/* Only show the Login screen */}
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  // If the user is logged in, show the other screens
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200ea',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



