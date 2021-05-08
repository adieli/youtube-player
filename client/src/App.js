import React, { useState } from 'react';
import './App.scss';
import PlaylistPanel from './PlaylistPanel';
import Player from './Player';
import { sendMessage, subscribeToMessages } from './api/client';

// Message types that can arrive from server
const messageTypes = {
    VIDEO_ADDITION: 'videoAddition',
    VIDEO_REMOVAL: 'videoRemoval',
    NEW_USER: 'newUser', // Sends back the whole playlist
};

function App() {
    // Is first message from the server
    const [isFirstMessage, setIsFirstMessage] = useState(true);
    const [playlist, setPlaylist] = useState([]);
    // Controls the video that is currently played
    const [currentVideo, setCurrentVideo] = useState('');
    const sendMsgToServer = ({ msgType, videoUrl }) => {
        let data = { type: msgType };
        if (videoUrl) {
            data = {...data, videoUrl};
        }
        sendMessage(data);
    }
    const publishNewVideo = videoUrl => {
        sendMsgToServer({ msgType: messageTypes.VIDEO_ADDITION, videoUrl });
    };
    const removeVideo = () => {
        sendMsgToServer({ msgType: messageTypes.VIDEO_REMOVAL });
    };
    // Once currently playing video has completed, decide on the next video that should be played
    const advanceCurrentVideo = () => {
        let nextVideoUrl = '';
        if (playlist.length > 0) {
            const currentVideoIsFirstInList = currentVideo === playlist[0];
            if (currentVideoIsFirstInList) { // We're the first to finish playing this video. Otherwise it already would have been removed
                if (playlist.length > 1) { // There is at least another video in the list, except the one that should be removed
                    nextVideoUrl = playlist[1];
                }
                removeVideo();
            } else { // The video that just finished playing was already removed from the list, so we just take the first one
                nextVideoUrl = playlist[0];
            }
        }
        setCurrentVideo(nextVideoUrl);
    }
    // Handles Messages received from the server
    const onMessageReceived = messageData => {
        const messageType = messageData.type;
        if (messageType === messageTypes.NEW_USER && isFirstMessage) {
            // We only need to refer to New User message at the first time it's received
            setIsFirstMessage(false);
            const receivedPlaylist = messageData.playlist;
            setPlaylist(receivedPlaylist);
            if (receivedPlaylist.length > 0) { // If the list from the server isn't empty
                setCurrentVideo(receivedPlaylist[0]);
            }
        } else if (messageType !== messageTypes.NEW_USER){ // We are ignoring messages of type New User if that is not the first one
            let updatedPlaylist = [...playlist];
            if (messageType === messageTypes.VIDEO_ADDITION) {
                const videoUrl = messageData.videoUrl;
                updatedPlaylist.push(videoUrl);
                if(!currentVideo) { // Upon connection the list from the server was empty
                    setCurrentVideo(videoUrl);
                }
            } else if (messageType === messageTypes.VIDEO_REMOVAL) {
                updatedPlaylist.splice(0,1);
            }
            setPlaylist(updatedPlaylist);
        }
    }
    // Subscribe to receiving messages from the server
    subscribeToMessages(onMessageReceived);

    return (
        <div className="app">
            <PlaylistPanel playlist={playlist} onAddButtonClicked={publishNewVideo}/>
            <Player videoUrl={currentVideo} onVideoEnded={advanceCurrentVideo}/>
        </div>
    );
}

export default App;
