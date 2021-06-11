import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View, StyleSheet} from 'react-native';
import {BottomNavigation} from "../../navigation/BottomNavigation";
import {Button, Dialog, Paragraph, Portal, TextInput} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from "../Reusable/Reusable";
import {ProgressChart} from "react-native-chart-kit";
import Toast from "react-native-toast-message";
import useAPI from "../../hooks/useAPI";

interface TemperatureChartData {
    labels: string[],
    data: number[],
}

// @ts-ignore
const PrinterScreen = ({navigation}) => {
        const [visible, setVisible] = useState(false);
        const [printerState, setPrinterState] = useState(false);
        const [refresh, setRefresh] = useState(false);

        const hideDialog = () => {
            setVisible(false);
            navigation.push('Home');
        };

        const getState = async () => {
            const res = await useAPI.requestPrinter('/api/printer', 'GET');
            if (!res.error) setPrinterState(res);
        };

        useEffect(() => {
            const isConnected = async () => {
                const ip = await AsyncStorage.getItem('ip');
                if (!ip) setVisible(true);
                else getState();
            }
            isConnected();
        }, [refresh]);

        return (<>
            {!visible && <>
                <Paragraph style={styles.connected}>Printer state</Paragraph>
                {printerState && <><TemperatureChart temperature={printerState?.temperature} refresh={getState}/>
                    <SdViewer/>
                </>}
            </>}
            <BottomNavigation navigation={navigation}/>
            <AddPrinterModal visible={visible} setVisible={setVisible} hideDialog={hideDialog}/>
        </>)
    }
;

const SdViewer = () => {
    const [sdState, setSdState] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const res = await useAPI.requestPrinter('/api/files?recursive=true', 'GET');
            console.log(res)
            setSdState(parseData(res.files));
        };
        getData();
    }, [refresh]);

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

    return (sdState && <>
        <Paragraph style={styles.sdText}>Files:</Paragraph>
        <FlatList data={sdState} renderItem={({item, index}: any) => <File file={item} key={index}/>}/>
    </>)
}

const File = ({file, key}: any) => {
    const [visible, setVisible] = useState(false);

    const printFile = async () => {
        const body = {
            'command': 'select',
            'print': true
        };
        const res = await useAPI.requestPrinter(`/api/files/local/${file.path}`, 'POST', '', body);
        if (!res.error) {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Uploading the file',
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
            setVisible(false);
        }
        console.log(res);
    };

    return (<>
        <View key={key}>
            {file.type !== 'folder' &&
            <Paragraph style={styles.fileName} onPress={() => setVisible(true)} key={key}>{file.name}</Paragraph>}
        </View>
        <Portal key={key}>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <Dialog.Title style={styles.modalTop}>You want to print this file ?</Dialog.Title>
                <Dialog.Actions style={styles.btnRow}>
                    <Button icon="cancel" onPress={() => setVisible(false)}>Cancel</Button>
                    <Button icon="cloud-print-outline" onPress={() => printFile()}>Print</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal></>);
};

const TemperatureChart = ({temperature, refresh}: any) => {
    const [visible, setVisible] = useState(false);
    const [bedTemp, setBedTemp] = useState('0');
    const [headTemp, setHeadTemp] = useState('0');

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
            if (t !== 'history' && temperature[t].actual && (temperature[t].target || temperature[t].target === 0)) {
                data.labels.push(t);
                data.data.push(temperature[t].actual / (temperature[t].target || temperature[t].actual));
            }
        return data;
    };

    const changeTemp = async () => {
        const bedBody = {
            "command": "target",
            "target": parseInt(bedTemp)
        };

        const headBody = {
            "command": "target",
            "targets": {
                "tool0": parseInt(headTemp),
            }
        };

        const res = await useAPI.requestPrinter('/api/printer/bed', 'POST', '', bedBody, false);
        const resp = await useAPI.requestPrinter('/api/printer/tool', 'POST', '', headBody, false);
        setVisible(false);
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Temperatures changed',
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
        refresh();
    };

    return (<>
        <Paragraph style={styles.temperatureText}>Temperatures:</Paragraph>
        <View style={styles.btnRow}>
            <Button style={styles.refreshBtn} color={'#E21717'} icon="refresh" mode={'outlined'} onPress={() => refresh()}>
                Refresh
            </Button>
            <Button style={styles.refreshBtn} color={'#E21717'} icon="fire" mode={'outlined'} onPress={() => setVisible(true)}>
                Heat
            </Button>
        </View>
        <ProgressChart
            data={parseTemperature()}
            width={screenWidth}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
        />
        <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <Dialog.Title style={styles.modalTop}>Set the temperature</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        mode={'outlined'}
                        label="Bed temperature"
                        value={bedTemp}
                        style={styles.input}
                        onChangeText={(temp: string) => setBedTemp(temp)}
                    />
                    <TextInput
                        mode={'outlined'}
                        label="Head temperature"
                        value={headTemp}
                        style={styles.input}
                        onChangeText={(temp: string) => setHeadTemp(temp)}
                    />
                </Dialog.Content>
                <Dialog.Actions style={styles.btnRow}>
                    <Button icon="cancel" onPress={() => setVisible(false)}>Cancel</Button>
                    <Button icon="send" onPress={() => changeTemp()}>Change</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </>)
};

const AddPrinterModal = ({visible, setVisible, hideDialog}: any) => {
    const [ip, setIp] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const login = async () => {
        if (!ip || !pass || !user)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Your information are required!',
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
        else {
            setLoading(true);
            const body = {user, pass, remember: true};
            const res = await useAPI.requestPrinter(`${ip}/api/login`, 'POST', '', body);
            if (res.error)
                setErr(true);
            else {
                await AsyncStorage.setItem('ip', ip);
                await AsyncStorage.setItem('token', res.session);
            }
            setLoading(false);
        }
    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title style={styles.modalTop}>Printer Connection</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Your printer information are required.</Paragraph>
                    {err && <Paragraph style={styles.error}>Wrong informations!</Paragraph>}
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
                        value={user}
                        style={styles.input}
                        onChangeText={(username: string) => setUser(username)}
                    />
                    <TextInput
                        mode={'outlined'}
                        secureTextEntry={true}
                        label="Password"
                        value={pass}
                        style={styles.input}
                        onChangeText={(pass: string) => setPass(pass)}
                    />
                    {loading && <Loader/>}
                </Dialog.Content>
                <Dialog.Actions style={styles.btnRow}>
                    <Button icon="cancel" onPress={hideDialog}>Cancel</Button>
                    <Button icon="login" onPress={() => login()}>Connect</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default PrinterScreen;

const styles = StyleSheet.create({
    modalTop: {
        textAlign: 'center',
    },
    input: {
        marginTop: 10,
    },
    loading: {
        marginTop: 5,
    },
    error: {
        color: '#E21717',
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
    refreshBtn: {
        // backgroundColor: '#E21717',
        color: '#E21717',
        width: '80%',
        flex: 1,
    },
    fileName: {
        textAlign: 'center',
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: '#5CB9C6',
        borderRadius: 10,
        color: '#5CB9C6',
        borderWidth: 2,
        paddingTop: 10,
        paddingBottom: 10,
        width: '80%',
        marginLeft: '10%',
        marginTop: 10
    }
});
