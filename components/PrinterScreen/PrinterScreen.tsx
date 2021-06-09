import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BottomNavigation} from "../../navigation/BottomNavigation";
import {Button, Dialog, Paragraph, Portal, TextInput} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Loader} from "../Reusable/Reusable";

// @ts-ignore
const PrinterScreen = ({navigation}) => {
    const [visible, setVisible] = useState(false);

    const hideDialog = () => {
        setVisible(false);
        navigation.push('Home');
    };

    useEffect(() => {
        const isConnected = async () => {
            const ip = await AsyncStorage.getItem('ip');
            if (!ip) setVisible(true);
        }
        isConnected();
    }, []);

    return (<>
        <Text style={styles.connected}>Printer !</Text>
        <BottomNavigation navigation={navigation}/>
        <AddPrinterModal visible={visible} setVisible={setVisible} hideDialog={hideDialog}/>
    </>)
};

const AddPrinterModal = ({visible, setVisible, hideDialog}: any) => {
    const [ip, setIp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title style={styles.modalTop}>Printer Connection</Dialog.Title>
                <Dialog.Content>
                    <Paragraph >Your printer information are required.</Paragraph>
                    <TextInput
                        mode={'outlined'}
                        label="Ip address"
                        value={ip}
                        style={styles.input}
                        onChangeText={ip => setIp(ip)}
                    />
                    <TextInput
                        mode={'outlined'}
                        secureTextEntry={true}
                        label="Password"
                        value={password}
                        style={styles.input}
                        onChangeText={pass => setPassword(pass)}
                    />
                    {loading && <Loader/>}
                </Dialog.Content>
                <Dialog.Actions style={styles.btnRow}>
                    <Button icon="cancel" onPress={hideDialog}>Cancel</Button>
                    <Button icon="login" onPress={() => console.log('Pressed')}>Connect</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default PrinterScreen;

const styles = StyleSheet.create({
    modalTop: {
        textAlign: 'center',
    },
    input: {
        marginTop: 10,
    },
    connected: {
        color: '#32a852',
        fontSize: 30,
        marginTop: '20%',
        textAlign: 'center',
    },
    btnRow: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
});
