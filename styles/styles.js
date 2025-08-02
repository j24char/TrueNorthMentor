import { StyleSheet, Dimensions, Appearance } from 'react-native';
import { useTheme } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

// Color palette
const primaryGrey = '#566970';
const primaryNavy = '#202938';
const primaryGold = '#cb9c4c';

// const lightColors = {
//   background: primaryGrey,
//   text: '#fff',
//   card: '#f0f0f0',
//   border: '#ccc',
//   iconColor: primaryNavy,
// };

// const darkColors = {
//   background: '#121212',
//   text: '#fff',
//   card: '#1e1e1e',
//   border: '#333',
//   iconColor: primaryGold,
// };

export default function createStyles(mode) {
  const isDark = mode === 'dark';
  const { colors } = useTheme();

  return StyleSheet.create({
    screenWidth,

    container: {
      flex: 1,
      padding: 16,
      marginTop: 30,
      //backgroundColor: isDark ? '#121212' : '#fff',
    },
    title: {
      //textAlign: 'center',
      fontSize: 26,
      fontWeight: 'bold',
      color: isDark ? primaryGold : primaryNavy,
      //marginTop: 20,
      //marginBottom: 20,
    },
    subtitle: {
      color: isDark ? primaryGold : primaryNavy,
      fontSize: 18,
      marginTop: 30,
    },
    homeScreenButtons: {
      backgroundColor: primaryNavy,
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    homeScreenButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    sectionTitle: {
        color: primaryNavy,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
        backgroundColor: isDark ? '#000' : '#fff',
    },
    feedContainer: {
        flex: 1,
        backgroundColor: isDark ? '#000' : '#fff',
    },
    feedItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        backgroundColor: isDark ? '#2a2a2a' : '#f2f2f2',
    },
    feedUser: {
        fontWeight: 'bold',
        color: isDark ? '#fff' : '#000',
        backgroundColor: isDark ? '#2a2a2a' : '#f2f2f2',
    },
    feedText: {
        fontSize: 14,
        color: isDark ? '#aaa' : '#333',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? primaryGold : primaryNavy,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      //backgroundColor: isDark ? '#000' : '#fff',
    },
    centeredText: {
      textAlign: 'center',
      marginTop: 20,
      color: colors.text,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      marginBottom: 10,
      backgroundColor: '#fff',
      color: '#000',
    },
    label: {
      fontSize: 16,
      marginBottom: 6,
      marginTop: 12,
      color: colors.text,
    },
    primaryButton: {
      backgroundColor: primaryNavy,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: primaryGrey,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    addButton: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: primaryNavy,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 12,
      elevation: 5,
    },
    signInButton: {
      backgroundColor: primaryNavy,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 12,
      marginBottom: 20,
      marginTop: 20,
      elevation: 5,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },

    logo: {
      width: 50,
      height: 50,
      alignSelf: 'left',
      marginBottom: 1,
      resizeMode: 'contain',
    },

    // Challenge card formatting:
    challengeCard: {
      backgroundColor: isDark ? '#303030' : '#f9f9f9',
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
      color: isDark ? primaryGold : primaryNavy,
      fontSize: 20,
      fontWeight: 'bold',
    },
    challengeDesc: {
      color: isDark ? primaryGold : primaryNavy,
      marginTop: 10,
      fontSize: 16,
    },
    challengeCat: {
      color: isDark ? primaryGold : primaryNavy,
      marginTop: 10,
      fontStyle: 'italic',
      color: '#666',
    },

    tile: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9',
      color: isDark ? primaryGold : primaryNavy,
      borderColor: isDark ? '#555' : '#ccc',
      padding: 16,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    tileSymbol: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
      marginLeft: 20,
    },
    tileGainLoss: {
      fontSize: 16,
      color: isDark ? '#fff' : '#000',
      marginLeft: 90,
    },
    tileDate: {
      fontSize: 16,
      color: isDark ? '#fff' : '#000',
    },

    // MODAL STYLES
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#121212',
      borderRadius: 12,
      borderWidth: 5,
      borderColor: '#888',
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    },
    modalText: {
      color: '#fff',
    },
    dateButton: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 12,
    },
    saveButton: {
      backgroundColor: primaryNavy,
      padding: 12,
      borderRadius: 8,
      marginTop: 10,
    },
    saveButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    cancelButton: {
      padding: 10,
      marginTop: 8,
    },
    cancelButtonText: {
      textAlign: 'center',
      color: '#fff',
      textDecorationLine: 'underline',
    },

    // Search Screen Styles:
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: isDark ? '#555' : '#ccc',
        backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 16,
        marginBottom: 16,
        borderWidth: 1,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: isDark ? '#fff' : '#000',
    },

    // Dashboard Screen Styles:
    chartColors: {
      color: primaryNavy,
      labelColor: primaryNavy,
      backgroundColor: isDark ? '#000' : '#fff',
      backgroundGradientFrom: isDark ? '#000' : '#fff',
      backgroundGradientTo: isDark ? '#000' : '#fff',
    },
    positionsHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: primaryNavy,
      marginTop: 20,
      marginBottom: 4,
      backgroundColor: isDark ? '#000' : '#fff',
    },
  });
}
