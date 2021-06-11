import {Appbar} from "react-native-paper";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {StyleSheet} from "react-native";

// @ts-ignore
export const BottomNavigation = ({navigation}) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('ip');
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Disconnected',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onShow: () => {
            },
            onHide: () => {
            },
            onPress: () => {
            }
        });
        navigation.push('Root');
    };

    return (<Appbar dark={true} style={styles.bottom}>
        <Appbar.Action icon="home" onPress={() => navigation.push('Home')}/>
        <Appbar.Action icon="lan-connect" onPress={() => navigation.push('PrinterScreen')}/>
        <Appbar.Action icon="mail" onPress={() => navigation.push('MessageScreen')}/>
        <Appbar.Action icon="magnify" onPress={() => navigation.push('SearchScreen')}/>
        <Appbar.Action icon="cog" onPress={() => navigation.push('Settings')}/>
        <Appbar.Action icon="logout" onPress={() => logOut()}/>
    </Appbar>)
};

const styles = StyleSheet.create({
    bottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});
