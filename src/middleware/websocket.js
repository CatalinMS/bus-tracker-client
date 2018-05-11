import SockJS from 'sockjs-client';
import {Stomp} from "stompjs/lib/stomp.js";
import * as actionTypes from "../actions/actionTypes";
import {ALL_LINES} from "../constants/constants";

function factory({messageToActionAdapter}) {
    let stompClient = null;

    return ({dispatch}) => {
        return next => action => {
            switch (action.type) {

                case actionTypes.WEBSOCKET_CONNECT:
                    console.log(`Connecting to ${action.payload.url}`);

                    if (stompClient !== null) {
                        stompClient.disconnect(() => console.log("disconnected"));
                    }

                    let socket = new SockJS(action.payload.url);
                    stompClient = Stomp.over(socket);
                    let topic = action.payload.topic == null ? ALL_LINES : `.${action.payload.topic}`;

                    stompClient.connect({}, function (frame) {
                            console.log('Connected: ' + frame);

                            stompClient.subscribe(`/topic/line${topic}`, function (msg) {
                                dispatch(messageToActionAdapter(msg) ||
                                    {type: actionTypes.WEBSOCKET_MESSAGE, payload: msg.body});
                            });

                        },
                        error => console.log(`Error while connecting to websocket:  ${error}`));

                    break;
                case actionTypes.WEBSOCKET_SEND:
                    console.log("WEBSOCKET_SEND");

                    // stompClient.send(JSON.stringify(action.payload));
                    break;
                case actionTypes.WEBSOCKET_DISCONNECT:
                    console.log("WEBSOCKET_DISCONNECT");

                    if (stompClient !== null) {
                        stompClient.disconnect(() => console.log("disconnected"));
                    }
                    break;
            }

            return next(action);
        }
    }
}

export default factory;
