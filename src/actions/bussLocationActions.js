import bussStationApi from "../api/bussStationApi";
import * as actionTypes from "./actionTypes";


function newLocation(location) {
    return {type: actionTypes.NEW_BUSS_LOCATION, data: location};
}

export function bussLocationListener() {
    console.log("new buss location");

    return function (dispatch) {
        dispatch(newLocation({
            line: "25",
            coordinates: {
                latitude: 46.7732854,
                longitude: 23.62140009999996
            }
        }));
    };
}
