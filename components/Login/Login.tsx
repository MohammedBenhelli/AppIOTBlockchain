import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import useAPI from "../../hooks/useAPI";

// @ts-ignore
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errPass, setErrPass] = useState(false);
    const [errMail, setErrMail] = useState(false);
    const [errLogin, setErrLogin] = useState(false);
    const [refresh] = useState(false)

    useEffect(() => {
        const isLogged = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    navigation.push('Home');
                }
            } catch (e) {
                console.log(e)
            }
        }
        isLogged();
    }, [refresh]);

    const verifForm = (): false | RegExpMatchArray | null => password.length > 7 && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    const submitForm = async () => {
        setErrPass(false);
        setErrMail(false);
        if (verifForm()) {
            const body = {email, password};
            try {
                const resJSON = await useAPI.requestBackend('users/login', 'POST', null, body);
                // @ts-ignore
                if (!resJSON.errors) {
                    // @ts-ignore
                    await AsyncStorage.setItem('token', resJSON.csrfToken);
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Connected',
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
                    navigation.push('Home');
                } else {
                    setErrLogin(true);
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Error',
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
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            if (password.length < 8) {
                setErrPass(true);
            }
            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                setErrMail(true);
            }
        }

    }

    const style = {
        emailInput: {
            width: '95%',
            marginTop: '15%',
            marginLeft: '2.5%',
        },
        passwordInput: {
            width: '95%',
            marginTop: '5%',
            marginLeft: '2.5%',
        },
        registerBtn: {},
        loginBtn: {},
        grid: {
            marginTop: '40%',
            marginLeft: '3%'
        },
        textErr: {
            color: '#a8324a',
            fontSize: 20,
            textAlign: 'center',
        }
    }

    return (<>
            <TextInput
                label="Email"
                defaultValue={email}
                style={style.emailInput}
                onChangeText={text => setEmail(text)}
            />
            {errMail && <Text style={style.textErr}>Enter a valid email !</Text>}
            <TextInput
                secureTextEntry={true}
                label="Password"
                defaultValue={password}
                style={style.passwordInput}
                onChangeText={password => setPassword(password)}
            />
            {errPass && <Text style={style.textErr}>At least 8 characters !</Text>}
            {errLogin && <Text style={style.textErr}>Wrong password/mail !</Text>}
            <FlatGrid style={style.grid}
                      data={[<Button style={style.registerBtn} icon="account-plus" mode="contained" dark={true}
                                     onPress={() => navigation.push('Register')}>
                          Register
                      </Button>,
                          <Button style={style.loginBtn} icon="login-variant" mode="contained" dark={true}
                                  onPress={() => submitForm()}>
                              Connect
                          </Button>]} renderItem={({item}) => item}/>

        </>
    );
};

export default Login;
