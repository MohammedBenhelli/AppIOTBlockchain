import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// @ts-ignore
import StorybookUI from './storybook'
import Config from 'react-native-config'
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Toast from 'react-native-toast-message';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};

const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <Navigation colorScheme={colorScheme}/>
                    <StatusBar/>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </PaperProvider>
            </SafeAreaProvider>
        );
    }
};

// export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App;
export default App;
