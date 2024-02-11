//
//  RCTCalendarModule.m
//  MySqliteApp
//
//  Created by Adam Horodyski on 11/02/2024.
//

#import <Foundation/Foundation.h>
#import "RCTCalendarModule.h"
#import <React/RCTLog.h>

@implementation RCTCalendarModule

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name
                  content:(NSString *)content
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejected:(RCTPromiseRejectBlock)reject)
{
  NSString *eventId = [[NSUUID UUID] UUIDString];
  
  if (!eventId) {
    reject(@"Create an event", @"No eventId returned", nil);
  }
  
  RCTLogInfo(@"[eventId: %@] Called craeteCalendarEvent with name %@ and content %@", eventId, name, content);
  
  resolve(eventId);
  
}

- (NSDictionary *)constantsToExport 
{
  return @{ @"DEFAULT_EVENT_NAME": @"Message reminder" };
}

@end
