import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './Playlist.scss';

const Playlist = ({ urlList }) => {
    return (
        <List className="playlist">
            {urlList.map(url => (
                <ListItem key={url} className="playlist-item">
                    <ListItemText secondary={url}/>
                </ListItem>
            ))}
        </List>
    );
}
export default Playlist;
