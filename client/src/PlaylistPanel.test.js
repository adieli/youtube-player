import ShallowRenderer from 'react-test-renderer/shallow';
import Playlist from './Playlist';
import PlaylistPanel from './PlaylistPanel';
import React from 'react';

describe('PlaylistPanel tests', () => {
    test('When playlist and onAddButtonClicked callback are passed to the PlaylistPanel, all child components rendered', () => {
        const playlist = ['https://www.youtube.com/watch?v=xdOykEJSXIg', 'https://www.youtube.com/watch?v=L42LOcH09O0'];
        const onAddButtonClicked = jest.fn().mockImplementation(() => {});

        const renderer = new ShallowRenderer();
        const result = renderer.render(<PlaylistPanel playlist={playlist} onAddButtonClicked={onAddButtonClicked}/>);
        expect(result.props.children.length).toBe(2);
        expect(result.props.children[0].type).toBe('div');
        expect(result.props.children[1]).toEqual(
            <Playlist urlList={playlist} />
        );
        expect(result).toMatchSnapshot();
    });
});
