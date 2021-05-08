import { w3cwebsocket as W3CWebSocket } from "websocket";

const SERVER_ENDPOINT = 'ws://127.0.0.1:8000';

const client = new W3CWebSocket(SERVER_ENDPOINT);
client.onopen = () => {
    console.log('WebSocket Client Connected');
};
const subscribeToMessages = onMessageCalllback => {
    client.onmessage = message => {
        const dataFromServer = JSON.parse(message.data);
        onMessageCalllback(dataFromServer);
    }
};
const sendMessage = data => {
    client.send(JSON.stringify(data));
}
export {
    sendMessage,
    subscribeToMessages,
} ;
