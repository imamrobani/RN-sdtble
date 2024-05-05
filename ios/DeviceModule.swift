//
//  DeviceModule.swift
//  sdtble
//
//  Created by Imam Robani on 05/05/24.
//

import Foundation

@objc(DeviceIDModule)
class DeviceIDModule: NSObject {
  
  @objc
  func getDeviceID(_ callback: @escaping RCTResponseSenderBlock) {
    let deviceID = UIDevice.current.identifierForVendor?.uuidString ?? ""
    callback([NSNull(), deviceID])
  }
  
  @objc
  static func requiresMainQueueSetup() ->Bool{
    return true;
  }
}
