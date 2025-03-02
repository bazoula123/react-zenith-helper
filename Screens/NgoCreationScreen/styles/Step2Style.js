
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
  },
  contentContainer: {
    padding: normalize(16),
    paddingBottom: normalize(32),
  },
  section: {
    marginBottom: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: normalize(8),
  },
  sectionSubtitle: {
    fontSize: normalize(15),
    color: Colors.textSecondary,
    marginBottom: normalize(16),
  },
  label: {
    fontSize: normalize(16),
    fontWeight: '600',
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
  toggleContainer: {
    flexDirection: 'row',
    gap: normalize(12),
  },
  toggleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(12),
    borderRadius: normalize(8),
    backgroundColor: '#F0F0F0',
    minHeight: normalize(56),
  },
  toggleOptionActive: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    fontSize: normalize(16),
    color: '#666',
    marginLeft: normalize(8),
  },
  toggleTextActive: {
    color: '#FFFFFF',
  }
});

export default styles;
