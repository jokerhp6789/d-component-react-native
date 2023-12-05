//
//  RNTMapManager.m
//  DComponentReactNative
//
//  Created by admin on 1/12/2566 BE.
//
#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>
#import "RCTConvert+Mapkit.h"
#import "RNTMapView.h"

@interface RNTMapManager : RCTViewManager<MKMapViewDelegate>
@end

@implementation RNTMapManager

- (UIView *)view
{
  RNTMapView * map = [RNTMapView new];
  map.delegate = self;
  return map;
}


- (void)mapView:(RNTMapView *)mapView regionDidChangeAnimated:(BOOL)animated {
  if(!mapView.onRegionChange){
    return;
  }
  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
    @"region":@{
      @"latitude":@(region.center.latitude),
      @"longitude":@(region.center.longitude),
      @"latitudeDelta":@(region.span.latitudeDelta),
      @"longitudeDelta":@(region.span.longitudeDelta),
    }
  });
}

RCT_EXPORT_MODULE(RNTMap)

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(region,MKCoordinateRegion,MKMapView){
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}

@end
