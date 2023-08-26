/* eslint-disable no-restricted-globals */
import _ from "lodash";

const toRadians = (number: number) => (number * Math.PI) / 180;

const calculateGreatCircleDistance = (locationA: any, locationZ: any) => {
    const lat1 = locationA.latitude;
    const lon1 = locationA.longitude;
    const lat2 = locationZ.latitude;
    const lon2 = locationZ.longitude;

    // DOCUMENTATION: http://www.movable-type.co.uk/scripts/latlong.html
    const p1 = toRadians(lat1);
    const p2 = toRadians(lat2);
    const deltagamma = toRadians(lon2 - lon1);
    const R = 6371e3; // gives d in metres
    const d = Math.acos(Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltagamma)) * R;

    return isNaN(d) ? 0 : d;
};

const kalman = (location: any, lastLocation: any, constant: any) => {
    const accuracy = Math.max(location.accuracy, 1);
    const result = { ...location, ...lastLocation };

    if (!lastLocation) {
        result.variance = accuracy * accuracy;
    } else {
        const timestampInc = location.time.getTime() - lastLocation.time.getTime();

        if (timestampInc > 0) {
            // We can tune the velocity and particularly the coefficient at the end
            const velocity = (calculateGreatCircleDistance(location, lastLocation) / timestampInc) * constant;
            result.variance += (timestampInc * velocity * velocity) / 1000;
        }

        const k = result.variance / (result.variance + accuracy * accuracy);
        result.latitude += k * (location.latitude - lastLocation.latitude);
        result.longitude += k * (location.longitude - lastLocation.longitude);
        // eslint-disable-next-line operator-assignment
        result.variance = (1 - k) * result.variance;
    }

    return {
        ...location,
        ..._.pick(result, ["latitude", "longitude", "variance"]),
    };
};

const runKalmanOnLocations = (rawData: any, kalmanConstant = 1000) => {
    let lastLocation: any;
    return rawData
        .map((location: any) => ({
            ...location,
            time: new Date(location.time),
        }))
        .map((location: any) => {
            lastLocation = kalman(location, lastLocation, kalmanConstant);
            return lastLocation;
        });
};

const getLatLngString = (location: any) => {
    if (!location) {
        return null;
    }

    return `${location.latitude},${location.longitude}`;
};
const getStaticImageMap = (latlng: any, googleKey: string) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latlng}&zoom=17&markers=color:pink%7Clabel:o%7Csize=100*100%7C${latlng}&size=1000x1000&key=${googleKey}`;
};

export default { runKalmanOnLocations, calculateGreatCircleDistance, getStaticImageMap, getLatLngString };
