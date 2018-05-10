import bussStationApi from "../api/bussRouteApi";
import * as actionTypes from "./actionTypes";


export function loadBussStationsSuccess(bussStations) {
    return {type: actionTypes.LOAD_BUSS_STATIONS, payload: bussStations};
}

export function loadBussStationSuccess(bussStation) {
    return {type: actionTypes.LOAD_BUSS_STATION, payload: bussStation};
}

// For all lines
export function loadBussStations() {
    return dispatch => {
        console.log("calling server for buss stations");

        return bussStationApi.loadBussStations()
            .then(bussStations => {
                dispatch(loadBussStationsSuccess(bussStations));
            }).catch(error => {
                console.log("Error while loading buss stations" + error);
            });
    };
}

export function loadBussStation(line) {
    return dispatch => {
        console.log("calling server for buss station: " + line);

        return bussStationApi.loadBussStation(line)
            .then(bussStation => {
                dispatch(loadBussStationSuccess(bussStation));
            }).catch(error => {
                console.log("Error while loading buss station" + error);
            });
    };
}
