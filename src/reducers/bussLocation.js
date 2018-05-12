import Store from '../store/bussLocation';
import * as actionTypes from "../actions/actionTypes";

export const initialState = Store;

export default function bussLocationReducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.RECEIVE_NEW_BUSS_LOCATION_ALL: {
            let newBussLocation = action.payload;

            let lineIndex = state.locations.findIndex(l => l.line === newBussLocation.line);
            let newLocations = [...state.locations];

            if (lineIndex === -1) {
                newLocations.push(newBussLocation);
            } else {
                newLocations[lineIndex] = newBussLocation;
            }

            return Object.assign({}, state, {locations: newLocations});
        }

        case actionTypes.RECEIVE_NEW_BUSS_LOCATION_ONE: {
            return Object.assign({}, state, {locations: [action.payload]});
        }

        case actionTypes.CLEAR_BUSS_LOCATIONS: {
            return Object.assign({}, state, {locations: []});
        }

        default:
            return state;
    }
}
