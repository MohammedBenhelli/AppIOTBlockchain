import {storiesOf} from '@storybook/react-native';
import React from 'react';
import Register from '../../../components/Register/Register';
import CenterView from '../CenterView';

storiesOf('Register', module)
    .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
    .add('Inscription', () => (
        <Register/>
    ));
