import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import { supabase } from '../supabase/client';
import { useThemeContext } from '../styles/ThemeContext';
import createStyles from '../styles/styles';
import IconImage from '../assets/TrueNorthIconNoBkgd.png';
import { Image } from 'react-native';

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState([]);
  const [groupedChallenges, setGroupedChallenges] = useState({});
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useThemeContext();
  const styles = createStyles(theme.mode);
  const colors = theme.colors;

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error fetching challenges:', error);
    } else {
      setChallenges(data);
      groupByCategory(data);
    }
  };

  const groupByCategory = (challengesArray) => {
    const grouped = {};
    challengesArray.forEach((challenge) => {
      if (!grouped[challenge.category]) {
        grouped[challenge.category] = [];
      }
      grouped[challenge.category].push(challenge);
    });
    setGroupedChallenges(grouped);
  };

  const handleTilePress = (challenge) => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const handleAddChallenge = async () => {
    const user = supabase.auth.getUser(); // returns a promise
    const { data: userData, error: userError } = await user;

    if (userError || !userData?.user) {
      console.log('User not authenticated');
      return;
    }

    const { error } = await supabase.from('user_challenges').insert([
      {
        user_id: userData.user.id,
        challenge_id: selectedChallenge.id,
        accepted_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.log('Error adding to user_challenges:', error);
    } else {
      console.log('Challenge added!');
    }

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={IconImage} style={styles.logo} />
      
      

      <ScrollView style={{ width: '100%' }}>
        {Object.keys(groupedChallenges).map((category) => (
          <View key={category} style={{ marginBottom: 20, paddingHorizontal: 10 }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              {category}
            </Text>
            {groupedChallenges[category].map((challenge) => (
              <TouchableOpacity
                key={challenge.id}
                onPress={() => handleTilePress(challenge)}
                style={styles.tile}
              >
                <Text style={styles.tileTitle}>{challenge.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

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
                <Text style={styles.modalTitle}>{selectedChallenge.title}</Text>
                <Text style={styles.modalText}>{selectedChallenge.description}</Text>
                <Text style={styles.modalItalicText}>
                  Category: {selectedChallenge.category}
                </Text>
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    style={styles.commonButton}
                    onPress={handleAddChallenge}
                  >
                    <Text style={styles.commonButtonText}>Add to my challenges</Text>
                  </TouchableOpacity>
                  
                  <View style={{ marginTop: 10 }} />
                  
                  <TouchableOpacity
                    style={styles.commonButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.commonButtonText}>Close</Text>
                  </TouchableOpacity>
                  
                  {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}



// const modalStyles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 20,
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 24,
//     borderRadius: 10,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
// });
