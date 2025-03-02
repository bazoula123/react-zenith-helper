
import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Typography, Spacing } from '../../../common/design';

const { width } = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
  return Math.round(size * scale);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: normalize(16),
  },
  scrollView: {
    flex: 1,
  },
  backButtonContainer: {
    marginBottom: normalize(16),
  },
  titleContainer: {
    marginBottom: normalize(24),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: normalize(8),
  },
  subtitle: {
    fontSize: normalize(16),
    color: Colors.textSecondary,
  },
  formSection: {
    marginBottom: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(18),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: normalize(16),
  },
  inputLabel: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: normalize(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: normalize(12),
    paddingHorizontal: normalize(12),
    backgroundColor: '#FFFFFF',
    minHeight: normalize(56),
    marginBottom: normalize(16),
  },
  inputContainerActive: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    marginLeft: normalize(12),
    fontSize: normalize(16),
    color: Colors.textPrimary,
  },
  errorText: {
    fontSize: normalize(14),
    color: Colors.error,
    marginTop: normalize(4),
    marginBottom: normalize(8),
  },
  imageSelector: {
    marginTop: normalize(8),
    marginBottom: normalize(24),
  },
  photoDescription: {
    fontSize: normalize(14),
    color: Colors.textSecondary,
    marginBottom: normalize(16),
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -normalize(4),
  },
  photoItem: {
    width: (width - normalize(32) - normalize(24)) / 4,
    height: (width - normalize(32) - normalize(24)) / 4,
    borderRadius: normalize(8),
    margin: normalize(4),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoIcon: {
    color: Colors.primary,
  },
  photoAddText: {
    fontSize: normalize(10),
    color: Colors.textSecondary,
    marginTop: normalize(4),
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: normalize(16),
    marginBottom: normalize(24),
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: normalize(12),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
    fontWeight: '600',
    marginRight: normalize(8),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(24),
  },
  progressBarContainer: {
    height: normalize(5),
    backgroundColor: '#E0E0E0',
    borderRadius: normalize(2.5),
    flex: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: normalize(2.5),
  },
  stepText: {
    fontSize: normalize(14),
    color: Colors.textSecondary,
    marginTop: normalize(8),
  }
});

export default styles;
