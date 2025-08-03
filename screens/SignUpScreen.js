import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import IconImage from '../assets/TrueNorthIconNoBkgd.png';
import { Image } from 'react-native';
import { supabase } from '../supabase/client';
import { Alert } from 'react-native';
import createStyles from '../styles/styles';
import { useThemeContext } from '../styles/ThemeContext';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useThemeContext();
  const styles = createStyles(theme.mode);
  const colors = theme.colors;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  
  useEffect(() => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    setIsValidPassword(
      password === confirmPassword &&
      passwordPattern.test(password)
    );
  }, [password, confirmPassword]);

  const createAccount = async () => {
    if (!isValidPassword) {
      Alert.alert("Error", "Passwords must match and meet strength requirements.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert("Sign Up Error", error.message);
      } else {
        Alert.alert("Success", "Account created! Check your email to confirm.");
        navigation.navigate('SignIn'); // Navigate back to sign in screen
      }
    } catch (err) {
      Alert.alert("Unexpected Error", err.message || String(err));
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={IconImage}
        style={styles.logo}
      />

      <Text style={[styles.sectionTitle]}>
        Sign Up
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
      <Text style={[styles.label, { color: colors.text }]}>Confirm Password</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Re-enter your password"
        placeholderTextColor={colors.border}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[
          styles.commonButton,
          { backgroundColor: isValidPassword ? colors.primaryNavy : '#ccc' }
        ]}
        onPress={createAccount}
        disabled={!isValidPassword}
      >
        <Text style={styles.commonButtonText}>Create Account</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.commonButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.commonButtonText}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
