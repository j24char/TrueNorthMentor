import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { supabase } from '../supabase/client';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import createStyles from '../styles/styles';
import { useThemeContext } from '../styles/ThemeContext';
import IconImage from '../assets/TrueNorthIconNoBkgd.png';

export default function HomeScreen() {
  const [todayChallenge, setTodayChallenge] = useState(null);
  const [progress, setProgress] = useState(0);
  const { theme } = useThemeContext();
  const styles = createStyles(theme.mode);
  const navigation = useNavigation();

  useEffect(() => {
    loadUser();
    selectTodayChallenge();
  }, []);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    console.log("User:", data.user);
  }

  async function selectTodayChallenge() {
    const todayKey = `daily_challenge_${new Date().toISOString().split('T')[0]}`;
    const usedKey = 'used_challenge_ids';

    const cached = await AsyncStorage.getItem(todayKey);
    if (cached) {
      setTodayChallenge(JSON.parse(cached));
      return;
    }

    const { data: challenges, error } = await supabase.from('challenges').select('*');
    if (error || !challenges) {
      console.error('Failed to load challenges', error);
      return;
    }

    const usedRaw = await AsyncStorage.getItem(usedKey);
    const usedIds = usedRaw ? JSON.parse(usedRaw) : [];

    const unused = challenges.filter((c) => !usedIds.includes(c.id));

    if (unused.length === 0) {
      setTodayChallenge(null);
      return;
    }

    const random = unused[Math.floor(Math.random() * unused.length)];

    // Update used list
    await AsyncStorage.setItem(todayKey, JSON.stringify(random));
    await AsyncStorage.setItem(usedKey, JSON.stringify([...usedIds, random.id]));

    setTodayChallenge(random);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={IconImage} style={styles.logo} />
        <Text style={styles.title}>True North Mentor</Text>
      </View>
      <Text style={styles.subtitle}>Your Progress</Text>
      <Progress.Bar
        progress={progress}
        width={300}
        height={12}
        color="#4caf50"
        borderRadius={6}
        style={{ marginVertical: 20 }}
      />
      <Text style={styles.subtitle}>{Math.round(progress * 100)}% complete</Text>

      {todayChallenge ? (
        <View style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>{todayChallenge.title}</Text>
          <Text style={styles.challengeDesc}>{todayChallenge.description}</Text>
          <Text style={styles.challengeCat}>Category: {todayChallenge.category}</Text>
          <Button
            title="Go to Challenge"
            onPress={() => navigation.navigate('Challenges')}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 40 }}>All challenges completed!</Text>
      )}
    </View>
  );
}
