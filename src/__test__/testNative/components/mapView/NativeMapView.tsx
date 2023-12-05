import {NativeSyntheticEvent, NativeUIEvent, requireNativeComponent, ViewProps} from 'react-native';

export interface INativeMapViewProps extends ViewProps {
    /**
     * A Boolean value that determines whether the user may use pinch
     * gestures to zoom in and out of the map.
     */
    zoomEnabled?: boolean;

    /**
     * The region to be displayed by the map.
     *
     * The region is defined by the center coordinates and the span of
     * coordinates to display.
     */
    region?: {
        /**
         * Coordinates for the center of the map.
         */
        latitude: number;
        longitude: number;

        /**
         * Distance between the minimum and the maximum latitude/longitude
         * to be displayed.
         */
        latitudeDelta: number;
        longitudeDelta: number;
    };

    /**
     * Callback on region change
     * @returns void
     */
    onRegionChange?: (
        props: NativeSyntheticEvent<INativeMapViewProps['region']>,
    ) => void;
}

// requireNativeComponent automatically resolves 'RNTMap' to 'RNTMapManager'
const NativeMapView = requireNativeComponent<INativeMapViewProps>('RNTMap');

export default NativeMapView;
