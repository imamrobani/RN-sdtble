import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  rowAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
  },
  scanButton: {
    backgroundColor: '#007bff',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  emptyListText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceId: {
    fontSize: 14,
    color: '#666',
  },
  deviceRssi: {
    fontSize: 14,
    color: '#333',
  },
  deviceAdvertisement: {
    fontSize: 14,
    color: '#999',
  },
  grow1: {flexGrow: 1},
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2,
  },
});

export default styles;
