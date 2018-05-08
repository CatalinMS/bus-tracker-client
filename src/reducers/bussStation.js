import Store from '../store/bussStation';
import * as actionTypes from "../actions/actionTypes";

export const initialState = Store;

export default function bussStationReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_BUSS_STATION: {

            console.log("LOAD_BUSS_STATION reducer: " + action.data);

            let newState = {
                ...state,
                stations: action.data[0].stations
            };

            return newState;
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
