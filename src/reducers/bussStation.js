import Store from '../store/bussStation';
import * as actionTypes from "../actions/actionTypes";

export const initialState = Store;

export default function bussStationReducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.LOAD_BUSS_STATIONS: {
            console.log("LOAD_BUSS_STATIONS reducer: " + action.payload);

            return {
                ...state,
                stations: action.payload[0].stations
            };
        }

        case actionTypes.LOAD_BUSS_STATION: {
            console.log("LOAD_BUSS_STATION reducer: " + action.payload);

            return {
                ...state,
                stations: action.payload.stations
            };
        }

        default:
            return state;
    }

}
