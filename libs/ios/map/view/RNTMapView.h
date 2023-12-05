//
//  RNTMapView.h
//  DComponentReactNative
//
//  Created by admin on 1/12/2566 BE.
//

#ifndef RNTMapView_h
#define RNTMapView_h


#endif /* RNTMapView_h */

#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView

@property (nonatomic,copy) RCTBubblingEventBlock onRegionChange;


@end
