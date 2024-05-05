//
//  DeviceIDModule.m
//  sdtble
//
//  Created by Imam Robani on 05/05/24.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(DeviceIDModule, NSObject)

RCT_EXTERN_METHOD(getDeviceID: (RCTResponseSenderBlock)callbak)

@end
