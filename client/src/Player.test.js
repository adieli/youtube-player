import React from 'react';
import Player from './Player';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactPlayer from 'react-player/youtube';

describe('Player tests', () => {
    test('When videoUrl and onVideoEnded callback are passed to the Player, ReactPlayer is rendered', () => {
        const videoUrl = 'https://www.youtube.com/watch?v=xdOykEJSXIg';
        const onVideoEnded = () => {};
        const renderer = new ShallowRenderer();
        const result = renderer.render(<Player videoUrl={videoUrl} onVideoEnded={onVideoEnded}/>);
        const output = renderer.getRenderOutput();
        expect(output).toEqual(
            <ReactPlayer playing height="500px" width="889px" url={videoUrl} onEnded={onVideoEnded}/>
        );
        expect(result).toMatchSnapshot();
    });
});
