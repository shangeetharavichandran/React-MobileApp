import {
    StackNavigator,
} from 'react-navigation';

import React from 'react';

const SignIn = require('./SignIn');
const Facilities  = require('./Facilities');
const Resources  = require('./Resources');
const Resource  = require('./Resource');

// StackNavigator
export default App = StackNavigator({
    SignIn: {
        screen: SignIn
    },

    Facilities : {
        screen: Facilities
    },

    Resources : {
        screen: Resources
    },

    Resource : {
        screen: Resource
    }
});
