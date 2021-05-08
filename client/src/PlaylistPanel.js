import React, { useState, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// ReactPlayer is imported here only for the sake of an easy validation prior to adding the url to the list
import ReactPlayer from 'react-player/youtube'
import './PlaylistPanel.scss';
import Playlist from './Playlist';

const PlaylistPanel = ({ onAddButtonClicked, playlist }) => {
    const ADD_BUTTON_TEXT = 'Add';
    const PLACEHOLDER = 'Enter a YouTube url';
    const [isInvalidVideoUrl, setIsInvalidVideoUrl] = useState(false);
    // Is the url trying to add already exists in playlist
    const [isDuplicateVideoUrl, setIsDuplicateVideoUrl] = useState(false);
    // Add button is disabled when the input is empty or turned out invalid
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // Update helperText only if the dependencies changed
    const helperText = useMemo(() => {
        const INVALID_URL_MESSAGE = 'Please type a valid YouTube url!';
        const DUPLICATE_URL_MESSAGE = `Please type a YouTube url that doesn't already exist in the list!`;
        let result = '';
        if (isDuplicateVideoUrl) {
            result = DUPLICATE_URL_MESSAGE;
        } else if (isInvalidVideoUrl) {
            result = INVALID_URL_MESSAGE;
        }
        return result;
    }, [isDuplicateVideoUrl, isInvalidVideoUrl]);
    const [videoUrl, setVideoUrl] = useState('');
    const isDuplicate = (videoUrl) => {
      const playlistSet = new Set(playlist);
        playlistSet.add(videoUrl);
        // If after adding the url to the Set that eliminates duplicates,
        // it doesn't have more elements than in the array, it's a duplicate
        const isDuplicate = playlistSet.size === playlist.length;
        setIsDuplicateVideoUrl(isDuplicate);
        return isDuplicate;
    };
    const addButtonClicked = () => {
        if (ReactPlayer.canPlay(videoUrl) && !isDuplicate(videoUrl)) { // Validate that the player can actually play this link
            onAddButtonClicked(videoUrl);
            setIsInvalidVideoUrl(false);
            setVideoUrl('');
        } else {
            // Displays error message and disables the button
            setIsInvalidVideoUrl(true);
            setIsButtonDisabled(true);
        }
    };
    const handleTextChange = event => {
        const text = event.target.value;
        setVideoUrl(text);
        if (isInvalidVideoUrl) { // Hide error after any character type
            setIsInvalidVideoUrl(false);
            setIsDuplicateVideoUrl(false);
        }
        if (text !== '') {
            if (isButtonDisabled) {
                setIsButtonDisabled(false);
            }
        } else { // Button is disabled when the value is empty
            setIsButtonDisabled(true);

        }
    }

    return (
        <Paper square className="playlist-container">
            <div className="action-container">
                <TextField value={videoUrl} label={PLACEHOLDER} variant="outlined" size="small" fullWidth onChange={handleTextChange}
                           error={isInvalidVideoUrl} helperText={helperText}/>
                <Button className="add-button" variant="outlined" color="primary" disabled={isButtonDisabled} onClick={addButtonClicked}>
                    {ADD_BUTTON_TEXT}
                </Button>
            </div>
            <Playlist urlList={playlist} />
        </Paper>
    );
}
export default PlaylistPanel;
