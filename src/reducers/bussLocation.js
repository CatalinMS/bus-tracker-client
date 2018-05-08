import Store from '../store/bussLocation';
import * as actionTypes from "../actions/actionTypes";

export const initialState = Store;

export default function bussLocationReducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.NEW_BUSS_LOCATION: {
            let newBussLocation = action.data;

             console.log("NEW_BUSS_LOCATION reducer: " + newBussLocation.data);


            let lineIndex = state.locations.findIndex(l => l.line === newBussLocation.line);
            let newLocations = [...state.locations];

            if (lineIndex === -1) {
                newLocations.push(newBussLocation);
            } else {
                newLocations[lineIndex] = newBussLocation;
            }

            return Object.assign(state, {locations: newLocations});
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