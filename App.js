
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
//import ProgressScreen from './screens/ProgressScreen';
import ChallengesScreen from './screens/ChallengesScreen';
//import ParentDashboardScreen from './screens/ParentDashboardScreen';






import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import DashboardScreen from './screens/Dashboard';
//import SearchScreen from './screens/SearchScreen';
//import SymbolScreen from './screens/SymbolScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import { StatusBar } from 'react-native';
import { supabase } from './supabase/client';

import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useThemeContext } from './styles/ThemeContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const isUserLoggedIn = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session !== null;
};

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      {/* Add more profile-related screens later if needed */}
    </Stack.Navigator>
  );
}

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#39db7a',
    secondary: '#457a5a',
    background: '#f7f7f7',
    card: '#fff',
    text: '#111',
    border: '#ccc',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#39db7a',
    secondary: '#457a5a',
    background: '#1a1a1a',
    card: '#2a2a2a',
    text: '#eee',
    border: '#555',
  },
};

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  )
}

function MainApp() {
  const [user, setUser] = useState(null);
  const { theme } = useThemeContext();

  useEffect(() => {
    // 1. Check existing session on app startup
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user); // <- your logic to store user in state
      }
    };

    checkSession();

    // 2. Listen for auth state changes (login/logout/refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      if (session) {
        setUser(session.user); // <- update user on login/refresh
      } else {
        setUser(null); // <- clear user on logout
      }
    });

    return () => {
      authListener.subscription?.unsubscribe(); // clean up listener
    };
  }, []);

  return (
    <>
    <StatusBar 
      barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
    />
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Hides the top header
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Challenges') {
              iconName = focused ? 'analytics' : 'analytics-outline';
            // } else if (route.name === 'Search') {
            //   iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#39db7a',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          listeners={({ navigation }) => ({
            tabPress: async (e) => {
              const loggedIn = await isUserLoggedIn();
              if (!loggedIn) {
                // This will always show the Auth screen as the first screen in the stack
                navigation.navigate('Profile', { screen: 'SignIn' });
              } else {
                // Later, replace this with profile/dashboard
                navigation.navigate('Profile', { screen: 'ProfileMain' });
              }
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}





// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Challenges" component={ChallengesScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
