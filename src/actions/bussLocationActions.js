import * as actionTypes from "./actionTypes";
import {ALL_LINES} from "../constants/constants";

const eventToActionAdapters = {
    RECEIVE_NEW_BUSS_LOCATION_ALL: payload => ({type: actionTypes.RECEIVE_NEW_BUSS_LOCATION_ALL, payload}),
    RECEIVE_NEW_BUSS_LOCATION_ONE: payload => ({type: actionTypes.RECEIVE_NEW_BUSS_LOCATION_ONE, payload}),
};

export function messageToActionAdapter(msg, topic) {
    const event = JSON.parse(msg.body);
    return topic === ALL_LINES ? eventToActionAdapters['RECEIVE_NEW_BUSS_LOCATION_ALL'](event) :
        eventToActionAdapters['RECEIVE_NEW_BUSS_LOCATION_ONE'](event);
}

export function connectToLocationServer(url, topic) {
    return dispatch => {
        dispatch({type: actionTypes.WEBSOCKET_CONNECT, payload: {url, topic}});
        dispatch({type: actionTypes.CLEAR_BUSS_LOCATIONS});
    }
}

export function clearBussLocations() {
    return dispatch => dispatch({type: actionTypes.CLEAR_BUSS_LOCATIONS});
}

// export function sendMessage(user, message) {
//     return dispatch => {
//         dispatch(_overTheSocket(CHAT_MESSAGE,{user, message}));
//     }
// }

function _overTheSocket(type, payload) {
    return {
        type: actionTypes.WEBSOCKET_SEND,
        payload: {type, payload}
    };
}
