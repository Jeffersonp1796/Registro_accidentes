import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#af111191',
    fontFamily: 'Poppins',
  },
  header: {
    backgroundColor: '#0078d7',
    padding: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#0078d7',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});