import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);  // If the user is logged in, isLoggedIn will be true
    });

    return unsubscribe; // Cleanup on component unmount
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          // If logged in, show the main app screens with bottom tabs
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Favorites') {
                  iconName = 'heart';
                } else if (route.name === 'Settings') {
                  iconName = 'settings';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#007aff',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        ) : (
          // If not logged in, show the login screen
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: { display: 'none' }, // Hide tab bar on the login screen
            }}
          >
            <Tab.Screen name="Login" component={LoginScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}







