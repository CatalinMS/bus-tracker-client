import * as actionTypes from "./actionTypes";

const eventToActionAdapters = {
    RECEIVE_NEW_BUSS_LOCATION: payload => ({type: actionTypes.RECEIVE_NEW_BUSS_LOCATION, payload})
};

export function messageToActionAdapter(msg) {
    const event = JSON.parse(msg.body);
    return eventToActionAdapters[actionTypes.RECEIVE_NEW_BUSS_LOCATION](event);
}

export function connectToLocationServer(url, topic) {
    return dispatch => {
        dispatch({type: actionTypes.WEBSOCKET_CONNECT, payload: {url, topic}});
    }
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
