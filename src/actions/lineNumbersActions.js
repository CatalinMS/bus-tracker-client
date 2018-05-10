import bussStationApi from "../api/bussRouteApi";
import * as actionTypes from "./actionTypes";

export function loadLineNumbersSuccess(lineNumbers) {
    return {type: actionTypes.LOAD_LINE_NUMBERS, payload: lineNumbers};
}

export function loadLineNumbers() {
    return dispatch => {
        console.log("calling server for line numbers");

        return bussStationApi.loadLineNumbers()
            .then(lineNumbers => {
                dispatch(loadLineNumbersSuccess(lineNumbers));
            }).catch(error => {
                console.log("Error while loading line numbers " + error);
            });
    };
}
