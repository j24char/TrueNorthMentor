import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 20,
  // },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  // subtitle: {
  //   fontSize: 18,
  //   marginTop: 30,
  // },
  challengeCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  challengeDesc: {
    marginTop: 10,
    fontSize: 16,
  },
  challengeCat: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#666',
  },
});
