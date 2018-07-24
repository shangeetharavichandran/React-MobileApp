import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

import App from './Application';

export default class Pagejump extends Component {
    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('Pagejump', () => Pagejump);
