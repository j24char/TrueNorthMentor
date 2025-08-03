import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import createStyles from '../styles/styles';
import { supabase } from '../supabase/client';

import IconImage from '../assets/TrueNorthIconNoBkgd.png';
import { Image } from 'react-native';
import { useThemeContext } from '../styles/ThemeContext';


export default function SignInScreen() {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useThemeContext();
  const styles = createStyles(theme.mode);
  const colors = theme.colors;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        console.log('Signed in user ID:', data.user?.id);
        navigation.navigate('Profile', { screen: 'ProfileMain' });
      }
    } catch (err) {
      Alert.alert("Unexpected error", err.message || String(err));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={IconImage}
        style={styles.logo}
      />

      <Text style={[styles.sectionTitle]}>
        Sign In
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>Email</Text>
      
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Enter your email"
        placeholderTextColor={colors.border}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={[styles.label, { color: colors.text }]}>Password</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Enter your password"
        placeholderTextColor={colors.border}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.commonButton}
        onPress={ signIn }
      >
        <Text style={styles.commonButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.commonButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.commonButtonText}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
