import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';

const config = {
    timeout: 20000,
    // maximumAge: 1000,
    enableHighAccuracy: true
}

export const GEOSerivce = {
    initGeolocation: () => {
        Geolocation.setRNConfiguration(config);
    },
    getGeolocation: (successCallback, errorCallback) => {
        Geolocation.getCurrentPosition(successCallback, errorCallback, { timeout: 20000 });
    },
    askToEnableGPS: (cb) => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(data => {
                console.log("EnableGPS", data); // enabled || already-enabled
                // The user has accepted to enable the location services
                // data can be :
                //  - "already-enabled" if the location services has been already enabled
                //  - "enabled" if user has clicked on OK button in the popup
                if (data === "enabled") cb(true);
                if (data === "already-enabled") cb(true);
            }).catch(err => {
                cb(false,err);
                console.log("EnableGPS:err", err);
                // The user has not accepted to enable the location services or something went wrong during the process
                // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                // codes : 
                //  - ERR00 : The user has clicked on Cancel button in the popup
                //  - ERR01 : If the Settings change are unavailable
                //  - ERR02 : If the popup has failed to open
            });
    },
    checkPermissions:()=>{
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then((result) => {
                console.log("result ", result);
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                console.log(error);
                // …
            });
    },
    requestPermission: (cb) => {
        let permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        if (Platform.OS === 'ios') {
            permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        }
        request(permission).then((result) => {
            cb(result);
        });
    },
    startedGeolocation: (successCallback, errorCallback) => {
        
        GEOSerivce.requestPermission(result => {
            console.log("ios",result);
            if (RESULTS.GRANTED === result) {
                if (Platform.OS === 'ios') {
                    
                    GEOSerivce.getGeolocation(successCallback, errorCallback);
                } else {
                    GEOSerivce.askToEnableGPS((enabled,err) => {
                        if (enabled) {
                            GEOSerivce.getGeolocation(successCallback, errorCallback);
                        } else {
                            errorCallback(err)
                        }
                    });
                }
            }
        });
    },
    startWatch: (successCallback, errorCallback) => {
        return Geolocation.watchPosition(successCallback, errorCallback);
    },
    clearWatch: (watchId) => {
        if (watchId) {
            Geolocation.clearWatch(watchId);
            Geolocation.stopObserving();
        }
    }
};


/**
 * requrest for location access
 * if granted,
 *  if android, asktoenableGPS
 *      enabled
 *          getGeolocation
 *   if ios, getGeolocation
 *      if error,
 *          alert to enable GPS
 *      if not error, get geopoints and start watch;
 *      if user enabled then user should click
 *  if not granted, request again, and show message 'without location you cannot find current nearby restaurant'
 */