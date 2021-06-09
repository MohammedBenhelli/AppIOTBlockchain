import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BottomNavigation} from "../../navigation/BottomNavigation";

// @ts-ignore
const MessageScreen = ({navigation}) => {
    return (<>
        <Text style={styles.connected}>Messages !</Text>
        <BottomNavigation navigation={navigation}/>
    </>)
};

export default MessageScreen;

const styles = StyleSheet.create({
    connected: {
        color: '#32a852',
        fontSize: 30,
        marginTop: '20%',
        textAlign: 'center',
    },
});
