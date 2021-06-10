import {storiesOf} from '@storybook/react-native';
import React from 'react';
import Login from '../../../components/Login/Login';
import CenterView from '../CenterView';

storiesOf('Login', module)
    .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
    .add('Connection', () => (
        <Login/>
    ));
