import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {BottomNavigation} from "../../navigation/BottomNavigation";

// @ts-ignore
const Home = ({navigation}) => {
    return (<>
        <Text style={styles.connected}>Home !</Text>
        <BottomNavigation navigation={navigation}/>
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
});
