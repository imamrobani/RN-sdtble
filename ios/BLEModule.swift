//
//  BLEModule.swift
//  sdtble
//
//  Created by Imam Robani on 05/05/24.
//

import Foundation
import CoreBluetooth
import React

@objc(BLEModule)
class BLEModule: RCTEventEmitter, CBCentralManagerDelegate {
  
  var centralManager: CBCentralManager!
  
  override init() {
    super.init()
    centralManager = CBCentralManager(delegate: self, queue: nil)
  }
  
  static override func moduleName() -> String! {
    return "BLEModule"
  }
  
  override func supportedEvents() -> [String] {
    return ["BLEDeviceFound"]
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool { return true }
  
  @objc func startScan() {
    centralManager.scanForPeripherals(withServices: nil, options: nil)
  }
  
  @objc func stopScan() {
    centralManager.stopScan()
  }
  
  func sendScanResult(peripheral: CBPeripheral, advertisementData: [String: Any], rssi: NSNumber) {
    var deviceInfo: [String: Any] = [
      "id": peripheral.identifier.uuidString,
      "name": peripheral.name ?? "Unknown",
      "rssi": rssi.intValue
    ]
    
    // Add additional advertisement data if available
    if !advertisementData.isEmpty {
      deviceInfo["advertisementData"] = advertisementData
    }
    
    sendEvent(withName: "BLEDeviceFound", body: deviceInfo)
  }
  
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    if central.state == .poweredOn {
      // Uncomment the line below if you want to start scanning immediately
      // startScan()
    } else {
      // Handle Bluetooth not available or other states
    }
  }
  
  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
    sendScanResult(peripheral: peripheral, advertisementData: advertisementData, rssi: RSSI)
  }
}
