import React from 'react'
import ReactPlayer from 'react-player/youtube'

const Player = ({ videoUrl, onVideoEnded }) => {
    return (
        <ReactPlayer playing height="500px" width="889px" url={videoUrl} onEnded={onVideoEnded}/>
    );
}
export default Player;
