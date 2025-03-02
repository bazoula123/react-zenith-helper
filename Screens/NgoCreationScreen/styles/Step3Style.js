
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
  mapPickerToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(16),
    flexWrap: 'wrap',
  },
  columnContainer: {
    flex: 1,
    minWidth: '48%',
    marginBottom: normalize(16),
  },
  mapPickerContainer: {
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  mapPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: normalize(16),
    borderRadius: normalize(12),
    width: '100%',
    marginBottom: normalize(12),
  },
  mapPickerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: normalize(16),
    marginLeft: normalize(8),
  },
  selectedLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    padding: normalize(12),
    borderRadius: normalize(12),
    width: '100%',
  },
  selectedLocationText: {
    color: Colors.success,
    fontWeight: '600',
    marginLeft: normalize(8),
  }
});

export default styles;
