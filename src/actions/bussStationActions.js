import bussStationApi from "../api/bussStationApi";
import * as actionTypes from "./actionTypes";


export function loadBussStationsSuccess(bussStations) {
    return {type: actionTypes.LOAD_BUSS_STATION, data: bussStations};
}

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
