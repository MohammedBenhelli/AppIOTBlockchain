import React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Home = ({navigation}) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Disconnected',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {}
        });
        navigation.push('Root');
    };

    return (<>
        <Text style={styles.connected}>Connected !</Text>
        <Appbar dark={true} style={styles.bottom}>
            <Appbar.Action
                icon="archive"
                onPress={() => console.log('Pressed archive')}
            />
            <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')}/>
            <Appbar.Action icon="label" onPress={() => console.log('Pressed label')}/>
            <Appbar.Action
                icon="logout"
                onPress={() => logOut()}
            />
        </Appbar>
    </>)
};

export default Home;

const styles = StyleSheet.create({
    connected: {
        color: '#32a852',
        fontSize: 30,
        marginTop: '20%',
        textAlign: 'center',
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});
