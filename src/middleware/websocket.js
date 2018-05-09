import SockJS from 'sockjs-client';
import {Stomp} from "stompjs/lib/stomp.js";
import * as actionTypes from "../actions/actionTypes";

class NullSocket {
    send(message) {
        console.log(`Warning: send called on NullSocket, dispatch a ${actionTypes.WEBSOCKET_CONNECT} first`);
    }
}

function factory({messageToActionAdapter}) {
    let socket = new NullSocket();

    return ({dispatch}) => {
        return next => action => {
            switch (action.type) {
                case actionTypes.WEBSOCKET_CONNECT:
                    console.log(`Connecting to ${action.payload.url}`);

                    socket = new SockJS(action.payload.url);
                    let stompClient = Stomp.over(socket);
                    let topic = action.payload.topic == null ? "" : `/${action.payload.topic}`;

                    stompClient.connect({}, function (frame) {
                            console.log('Connected: ' + frame);


                            stompClient.subscribe(`/topic/line${topic}`, function (msg) {
                                dispatch(messageToActionAdapter(msg) ||
                                    {type: actionTypes.WEBSOCKET_MESSAGE, payload: msg.body});
                            });

                        },
                        error => console.log(`Error while connecting to wensocket:  ${error}`));

                    break;
                case actionTypes.WEBSOCKET_SEND:
                    console.log("WEBSOCKET_SEND");

                    // socket.send(JSON.stringify(action.payload));
                    break;
            }
            return next(action);
        }
    }
}

export default factory;
