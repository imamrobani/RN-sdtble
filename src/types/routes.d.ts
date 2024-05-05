import {PeripheralInfo} from 'react-native-ble-manager';

type RootStackParamList = {
  ScanDevice: undefined;
  PeripheralDetail: {peripheralData: PeripheralInfo};
};
