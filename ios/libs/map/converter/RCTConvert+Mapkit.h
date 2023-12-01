//
//  RCTConvert+Mapkit.h
//  DComponentReactNative
//
//  Created by admin on 1/12/2566 BE.
//

#ifndef RCTConvert_Mapkit_h
#define RCTConvert_Mapkit_h


#endif /* RCTConvert_Mapkit_h */

#import <MapKit/MapKit.h>
#import <React/RCTConvert.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert+CoreLocation.h>

@interface RCTConvert (Mapkit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json;
+ (MKCoordinateRegion)MKCoordinateRegion:(id)json;

@end

