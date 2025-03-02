
import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../../common/design';

const styles = StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: 10,
    },
    container: {
      flex: 1,
      paddingVertical: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      marginBottom: 8,
    },
    sectionSubtitle: {
      fontSize: 15,
      color: Colors.textSecondary,
      marginBottom: 24,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    checkboxLabel: {
      fontSize: 16,
      color: Colors.textPrimary,
      marginLeft: 8,
      flex: 1, // Ensures the text uses the remaining space
      flexWrap: 'wrap', // Allows the text to wrap to the next line
    },
    optionalQuestionsTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      marginTop: 24,
      marginBottom: 12,
    },
    errorText: {
      fontSize: 14,
      color: Colors.error,
      marginTop: 4,
      marginBottom: 8,
    },
    nextButton: {
      backgroundColor: Colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 12,
      marginTop: 16,
    },
    nextButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 8,
    },
  });
  
  export default styles;
