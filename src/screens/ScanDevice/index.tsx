/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {NativeModules, NativeEventEmitter} from 'react-native';
import styles from './styles';

const {BLEModule, DeviceIDModule} = NativeModules;
const bleModuleEmitter = new NativeEventEmitter(BLEModule);

const MAX_DEVICES = 10; // The maximum number of devices to be discovered before scanning stops
const SCAN_TIMEOUT = 5000; // Time in milliseconds before autoscan stops (e.g. 5 seconds)

interface Device {
  id: string;
  name: string | null;
  rssi: number;
  advertisementData?: any;
}

const BLEScanner: React.FC = () => {
  const [deviceID, setDeviceID] = useState('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanTimeoutId, setScanTimeoutId] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    DeviceIDModule.getDeviceID((error: any, id: string) => {
      if (!error) {
        setDeviceID(id);
      }
    });

    return () => {
      if (scanTimeoutId) {
        clearTimeout(scanTimeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (isScanning && devices.length < MAX_DEVICES) {
      // Setelah MAX_DEVICES ditemukan, berhenti scan
      setScanTimeoutId(setTimeout(stopScan, SCAN_TIMEOUT));
    } else if (!isScanning && scanTimeoutId) {
      // Jika scan berhenti sebelum timeout, hapus timeout
      clearTimeout(scanTimeoutId);
      setScanTimeoutId(null);
    }
  }, [isScanning, devices]);

  useEffect(() => {
    const subscription = bleModuleEmitter.addListener(
      'BLEDeviceFound',
      (device: Device) => {
        const existingDeviceIndex = devices.findIndex(d => d.id === device.id);
        if (existingDeviceIndex === -1) {
          setDevices(prevDevices => [...prevDevices, device]);
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [devices]);

  const startScan = () => {
    BLEModule.startScan();
    setIsScanning(true);
  };

  const stopScan = () => {
    BLEModule.stopScan();
    setIsScanning(false);
  };

  const toggleScan = () => {
    if (isScanning) {
      stopScan();
    } else {
      setDevices([]); // reset data
      startScan();
    }
  };

  const renderItem = ({item}: {item: Device}) => (
    <View style={styles.deviceItem}>
      <Text style={styles.deviceName}>{item.name || 'Unknown'}</Text>
      <Text style={styles.deviceId}>{item.id}</Text>
      <Text style={styles.deviceRssi}>RSSI: {item.rssi}</Text>
      {/* {item.advertisementData && (
        <Text style={styles.deviceAdvertisement}>
          Advertisement Data: {JSON.stringify(item.advertisementData)}
        </Text>
      )} */}
    </View>
  );

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyListText}>No devices found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.deviceName}>Device ID :</Text>
        <Text style={styles.deviceId}>{deviceID}</Text>
      </View>
      <View style={styles.rowAction}>
        <TouchableOpacity
          style={[
            styles.button,
            isScanning ? styles.stopButton : styles.scanButton,
          ]}
          onPress={toggleScan}>
          <Text style={styles.buttonText}>
            {isScanning ? 'Stop Scan' : 'Start Scan'}
          </Text>
        </TouchableOpacity>
        {isScanning && <ActivityIndicator size="large" />}
      </View>
      <FlatList
        data={devices}
        extraData={devices.length}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.grow1}
        ListEmptyComponent={renderEmptyList()}
      />
    </View>
  );
};

export default BLEScanner;
