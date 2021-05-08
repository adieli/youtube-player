import React from 'react';
import Playlist from './Playlist';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Playlist tests', () => {
    test('When a list of items is passed to the playlist, they are rendered', () => {
        const playlist = ['https://www.youtube.com/watch?v=xdOykEJSXIg', 'https://www.youtube.com/watch?v=L42LOcH09O0'];
        const renderer = new ShallowRenderer();
        const result = renderer.render(<Playlist urlList={playlist}/>);
        const output = renderer.getRenderOutput();
        expect(output).toEqual(
            <List className="playlist">
            <ListItem key={playlist[0]} className="playlist-item">
                <ListItemText secondary={playlist[0]}/>
            </ListItem>
            <ListItem key={playlist[1]} className="playlist-item">
                <ListItemText secondary={playlist[1]}/>
            </ListItem>
            </List>
        );
        expect(result).toMatchSnapshot();
    });
});
