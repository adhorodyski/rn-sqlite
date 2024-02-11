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

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name content:(NSString *)content)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, content);
}

@end
