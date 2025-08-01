import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { supabase } from '../supabase/client';
import IconImage from '../assets/TrueNorthIconNoBkgd.png';
import createStyles from '../styles/styles';
import { useThemeContext } from '../styles/ThemeContext';

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState([]);
  const { theme } = useThemeContext();
  const styles = createStyles(theme.mode);

  const fetchChallenges = async () => {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
    } else {
      //console.log('Fetched challenges:', data); // 👈 ADD THIS
      setChallenges(data);
    }
  };

  // Check if authenticated properly:
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
      } else if (!session) {
        console.log('No active session – user not authenticated');
      } else {
        console.log('Authenticated as:', session.user);
      }
    };
    checkAuth();
  }, []);


  useEffect(() => {
    fetchChallenges();
  }, []);

  // Group challenges by category
  const groupedByCategory = challenges.reduce((acc, challenge) => {
    if (!acc[challenge.category]) acc[challenge.category] = [];
    acc[challenge.category].push(challenge);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Image source={IconImage} style={styles.logo} />
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <View key={category} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {category}
          </Text>
          {items.map((item) => (
            <View key={item.id.toString()} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
