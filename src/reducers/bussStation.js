import Store from '../store/bussStation';
import * as actionTypes from "../actions/actionTypes";

export const initialState = Store;

export default function bussStationReducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.LOAD_BUSS_STATIONS: {
            return {
                ...state,
                stations: action.payload[0].stations
            };
        }
        case actionTypes.CLEAR_BUSS_STATIONS: {
            return {
                ...state,
                stations: []
            };
        }
        case actionTypes.LOAD_BUSS_STATION: {

            return {
                ...state,
                stations: action.payload.stations
            };
        }

        default:
            return state;
    }

}
