import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {BottomNavigation} from "../../navigation/BottomNavigation";
import {Button, Dialog, Paragraph, Portal, TextInput} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from "../Reusable/Reusable";
import * as data from './fakeData.json';
import * as dataSd from './fakeDataSD.json';
import {ProgressChart} from "react-native-chart-kit";

interface TemperatureChartData {
    labels: string[],
    data: number[],
}

// @ts-ignore
const PrinterScreen = ({navigation}) => {
    const [visible, setVisible] = useState(false);
    const [printerState, setPrinterState] = useState(data);

    const hideDialog = () => {
        setVisible(false);
        navigation.push('Home');
    };

    useEffect(() => {
        const isConnected = async () => {
            const ip = await AsyncStorage.getItem('ip');
            // if (!ip) setVisible(true);
        }
        isConnected();
    }, []);

    return (<>
        <Paragraph style={styles.connected}>Printer state</Paragraph>
        {printerState && <TemperatureChart temperature={printerState.temperature}/>}
        <SdViewer/>
        <BottomNavigation navigation={navigation}/>
        <AddPrinterModal visible={visible} setVisible={setVisible} hideDialog={hideDialog}/>
    </>)
};

const SdViewer = () => {
    const [sdState, setSdState] = useState(dataSd.files);

    const parseData = (sdState: any) => {
        let data: any[] = [];
        let check: boolean = false;
        sdState.map((file: any) => {
            if (file.type !== 'folder') data.push(file);
            else {
                data.push(...file.children);
                check = true;
            }
        });
        if (check) data = parseData(data);
        return data;
    }

    return (<>
        <Paragraph style={styles.sdText}>Files:</Paragraph>
        {sdState && <FlatList data={parseData(sdState)} renderItem={({item, index}: any) =>
            <View key={index}>
                {item.type !== 'folder' && <Paragraph key={index}>{item.name}</Paragraph>}
            </View>}
        />}
    </>)
}

const TemperatureChart = ({temperature}: any) => {
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundColor: "#F2F2F2",
        backgroundGradientFrom: "#F2F2F2",
        backgroundGradientTo: "#F2F2F2",
        color: (opacity = 1) => `rgb(226, 23, 23, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForLabels: {
            fontSize: 16
        },
    }

    const parseTemperature = () => {
        const data: TemperatureChartData = {
            labels: [],
            data: [],
        };
        for (const t in temperature)
            if (t !== 'history' && temperature[t].actual && temperature[t].target) {
                data.labels.push(t);
                data.data.push(temperature[t].actual / temperature[t].target);
            }
        console.log(data);
        return data;
    }

    return (<>
        <Paragraph style={styles.temperatureText}>Temperatures:</Paragraph>
        <ProgressChart
            data={parseTemperature()}
            width={screenWidth}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
        />
    </>)
}

const AddPrinterModal = ({visible, setVisible, hideDialog}: any) => {
    const [ip, setIp] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title style={styles.modalTop}>Printer Connection</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Your printer information are required.</Paragraph>
                    <TextInput
                        mode={'outlined'}
                        label="Ip address"
                        value={ip}
                        style={styles.input}
                        onChangeText={(ip: string) => setIp(ip)}
                    />
                    <TextInput
                        mode={'outlined'}
                        label="Username"
                        value={username}
                        style={styles.input}
                        onChangeText={(username: string) => setUsername(username)}
                    />
                    <TextInput
                        mode={'outlined'}
                        secureTextEntry={true}
                        label="Password"
                        value={password}
                        style={styles.input}
                        onChangeText={(pass: string) => setPassword(pass)}
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
        fontSize: 25,
        marginTop: '15%',
        textAlign: 'center',
        paddingBottom: '3%',
        paddingTop: '3%',
    },
    btnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    temperatureText: {
        color: '#E21717',
        marginLeft: 15,
        fontSize: 20,
    },
    sdText: {
        marginLeft: 15,
        fontSize: 20,
    },
});
