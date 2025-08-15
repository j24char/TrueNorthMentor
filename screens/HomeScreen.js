import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, FlatList } from 'react-native';
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
  const [user, setUser] = useState(null);
  const [userChallenges, setUserChallenges] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const { theme } = useThemeContext();
  const styles = createStyles(theme.mode);
  const navigation = useNavigation();

  useEffect(() => {
    loadUser();
    selectTodayChallenge();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchUserChallenges(user.id);
    }
  }, [user]);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    console.log("User:", data.user);
  }

  async function fetchUserChallenges(userId) {
    const { data, error } = await supabase
      .from('user_challenges')
      .select(`
        id,
        completed_at,
        challenges (
          title,
          description,
          category
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user challenges:', error);
      return;
    }

    setUserChallenges(data || []);
    // Calculate progress
    const now = new Date();
    const completedCount = challenges.filter(
      (c) => c.completed_at && new Date(c.completed_at) <= now
    ).length;

    const progressPercent = challenges.length > 0 ? completedCount / challenges.length : 0;
    setProgress(progressPercent);
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

    await AsyncStorage.setItem(todayKey, JSON.stringify(random));
    await AsyncStorage.setItem(usedKey, JSON.stringify([...usedIds, random.id]));

    setTodayChallenge(random);
  }

  const handleCompleteChallenge = async () => {
    if (!selectedChallenge) return;

    try {
      const { error } = await supabase
        .from('user_challenges')
        .update({ completed_at: new Date().toISOString() }) // set current timestamp
        .eq('id', selectedChallenge.id);

      if (error) {
        console.error('Error marking challenge complete:', error);
        return;
      }

      // Update local state to reflect change immediately
      setUserChallenges((prev) =>
        prev.map((c) =>
          c.id === selectedChallenge.id
            ? { ...c, completed_at: new Date().toISOString() }
            : c
        )
      );

      // Update progress
      const completedCount = userChallenges.filter(
        (c) =>
          (c.completed_at && new Date(c.completed_at) <= new Date()) ||
          c.id === selectedChallenge.id
      ).length;
      const progressPercent =
        userChallenges.length > 0 ? completedCount / userChallenges.length : 0;
      setProgress(progressPercent);

      setModalVisible(false); // close modal
    } catch (err) {
      console.error('Unexpected error completing challenge:', err);
    }
  };


  const renderUserChallenge = ({ item }) => {
    const isCompleted = item.completed_at && new Date(item.completed_at) <= new Date();

    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          setSelectedChallenge(item);
          setModalVisible(true);
        }}
      >
        <View style={styles.cell}>
          <View style={[styles.checkboxBox, isCompleted && styles.checkboxChecked]} />
        </View>
        <View style={styles.cell}>
          <Text style={styles.common_text}>{item.challenges.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={IconImage} style={styles.logo} />
        <Text style={styles.title}>True North Mentor</Text>
      </View>

      <Text style={styles.subtitle}>My Progress</Text>
      <Progress.Bar
        progress={progress}
        width={300}
        height={12}
        color="#4caf50"
        borderRadius={6}
        style={{ marginVertical: 20 }}
      />
      <Text style={styles.common_text}>{Math.round(progress * 100)}% complete</Text>

      {todayChallenge ? (
        <View style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>{todayChallenge.title}</Text>
          <Text style={styles.challengeDesc}>{todayChallenge.description}</Text>
          <Text style={styles.challengeCat}>Category: {todayChallenge.category}</Text>

          <TouchableOpacity
            style={styles.commonButton}
            onPress={() => navigation.navigate('Challenges')}
          >
            <Text style={styles.commonButtonText}>Go To Challenge</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ marginTop: 40 }}>All challenges completed!</Text>
      )}

      <Text style={[styles.subtitle, { marginTop: 30 }]}>Active Challenges</Text>
      {userChallenges.length > 0 ? (
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Completed</Text>
            <Text style={styles.headerText}>Challenge</Text>
          </View>
          <FlatList
            data={userChallenges}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUserChallenge}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                {selectedChallenge && (
                  <>
                    <Text style={styles.modalTitle}>{selectedChallenge.challenges.title}</Text>
                    <Text style={styles.modalText}>{selectedChallenge.challenges.description}</Text>
                    <Text style={styles.modalItalicText}>
                      Category: {selectedChallenge.challenges.category}
                    </Text>
                    <View style={{ marginTop: 20 }}>
                      <TouchableOpacity
                        style={styles.commonButton}
                        onPress={handleCompleteChallenge}
                      >
                        <Text style={styles.commonButtonText}>Challenge Complete</Text>
                      </TouchableOpacity>

                      <View style={{ marginTop: 10 }} />

                      <TouchableOpacity
                        style={styles.commonButton}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.commonButtonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>

        </View>
      ) : (
        <Text style={styles.common_text}>No active challenges</Text>
      )}

    </View>
  );
}
