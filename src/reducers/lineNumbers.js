import Store from '../store/lineNumbers';
import * as actionTypes from "../actions/actionTypes";

export const initialState = Store;

export default function bussLocationReducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.LOAD_LINE_NUMBERS: {
            return Object.assign(...state, {lines: action.payload});
        }

        default:
            return state;
    }

}
