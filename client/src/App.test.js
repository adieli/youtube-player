import React from 'react';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';

const client = require('./api/client');

describe('App tests', () => {
    test('When App is rendered, elements are rendered as expected and subscribeToMessages is called once', () => {
        const subscribeToMessagesSpy = jest.spyOn(client, 'subscribeToMessages');
        const renderer = new ShallowRenderer();
        const result = renderer.render(<App />);
        const output = renderer.getRenderOutput();

        expect(output.type).toBe('div');
        expect(output.props.children.length).toEqual(2);
        expect(subscribeToMessagesSpy).toBeCalledTimes(1);
        expect(result).toMatchSnapshot();
    });
});
