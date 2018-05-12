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

        case 'MEALS_REPLACE': {
            return {
                ...state,
                error: null,
                loading: false,
                meals: action.data,
            };
        }
        case 'RECIPES_ERROR': {
            return {
                ...state,
                error: action.data,
            };
        }
        case 'RECIPES_REPLACE': {
            let recipes = [];

            // Pick out the props I need
            if (action.data && typeof action.data === 'object') {
                recipes = action.data.map(item => ({
                    id: item.id,
                    title: item.title,
                    body: item.body,
                    category: item.category,
                    image: item.image,
                    author: item.author,
                    ingredients: item.ingredients,
                    method: item.method,
                }));
            }

            return {
                ...state,
                error: null,
                loading: false,
                recipes,
            };
        }
        default:
            return state;
    }
}
