import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BottomNavigation} from "../../navigation/BottomNavigation";
import {Searchbar} from "react-native-paper";

// @ts-ignore
const SearchScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);
    return (<>
        <Searchbar style={styles.searchBar} placeholder="Search" onChangeText={onChangeSearch} value={searchQuery}/>
        <Text style={styles.connected}>{searchQuery}</Text>
        <BottomNavigation navigation={navigation}/>
    </>)
};

export default SearchScreen;

const styles = StyleSheet.create({
    searchBar: {
        top: '6%'
    },
    connected: {
        color: '#32a852',
        fontSize: 30,
        marginTop: '20%',
        textAlign: 'center',
    },
});
