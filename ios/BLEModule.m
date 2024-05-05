//
//  BLEModule.m
//  sdtble
//
//  Created by Imam Robani on 05/05/24.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(BLEModule, NSObject)

RCT_EXTERN_METHOD(startScan)
RCT_EXTERN_METHOD(stopScan)

@end
