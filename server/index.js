const http = require('http');
const webSocket = require('websocket');
const { v4: uuidv4 } = require('uuid');
const webSocketServer = webSocket.server;
const wsServerPort = 8000;

// Starting and initializing servers
const server = http.createServer();
server.listen(wsServerPort);
const wsServer = new webSocketServer({
    httpServer: server
});

// Active client connections
const clients = {};
// Current list of videos
const playlist = [];

const sendMessage = (json) => {
    // We are sending the current playlist to all connected clients
    Object.keys(clients).map((client) => {
        clients[client].sendUTF(json);
    });
}

const messageTypes = {
    VIDEO_ADDITION: 'videoAddition',
    VIDEO_REMOVAL: 'videoRemoval',
    NEW_USER: 'newUser', // Sends back the whole playlist
}

wsServer.on('request', request => {
    const userID = uuidv4(); // Generates a unique id for every new connection
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
    const data = { playlist, type: messageTypes.NEW_USER };
    sendMessage(JSON.stringify(data));
    connection.on('message', message => {
        if (message.type === 'utf8') {
            const dataFromClient = JSON.parse(message.utf8Data);
            let json = { type: dataFromClient.type };
            if (dataFromClient.type === messageTypes.VIDEO_ADDITION) {
                const videoUrl = dataFromClient.videoUrl;
                playlist.push(videoUrl);
                json = {...json, videoUrl };
            } else if (dataFromClient.type === messageTypes.VIDEO_REMOVAL) {
                playlist.splice(0,1); // Remove the video from the top of the list
                json = { ...json, playlist };
            }
            const stringifiedJson = JSON.stringify(json);
            console.log(`Sending the following message: ${stringifiedJson}`);
            sendMessage(stringifiedJson);
        }
    });
    // user disconnected
    connection.on('close', () => {
        console.log((new Date()) + " User " + userID + " disconnected.");
        delete clients[userID];
    });
});
