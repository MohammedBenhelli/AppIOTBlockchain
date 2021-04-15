import React, {useState} from 'react';
import {TextInput, Button, Text} from 'react-native-paper';
// @ts-ignore
import {FlatGrid} from "react-native-super-grid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";


// @ts-ignore
const Register = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerif, setPasswordVerif] = useState('');
    const [errPass, setErrPass] = useState(false);
    const [errPassVerif, setErrPassVerif] = useState(false);
    const [errMail, setErrMail] = useState(false);
    const [errUsername, setErrUsername] = useState(false);
    const [errRegister, setErrRegister] = useState(false);

    const verifForm = (): false | null | boolean => password.length > 7 && password === passwordVerif && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && username.length > 1;

    const submitForm = async () => {
        setErrPass(false);
        setErrPassVerif(false);
        setErrMail(false);
        setErrUsername(false);
        if (verifForm()) {
            const body = {username, email, password};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };
            try {
                const res = await fetch('https://e3a33e2fcf77.ngrok.io/api/users/register', options);
                const resJSON = await res.json();
                if (!resJSON.errors) {
                    await AsyncStorage.setItem('token', resJSON.csrfToken);
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Account created',
                        visibilityTime: 4000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                        onShow: () => {},
                        onHide: () => {},
                        onPress: () => {}
                    });
                    navigation.push('Home');
                } else {
                    setErrRegister(true);
                }
                console.log(resJSON);
            } catch (e) {
                console.log(e)
            }
        } else {
            if (password.length < 8) {
                setErrPass(true);
            }
            if (password !== passwordVerif) {
                setErrPassVerif(true);
            }
            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                setErrMail(true);
            }
            if (username.length < 2) {
                setErrUsername(true);
            }
        }

    }

    const style = {
        emailInput: {
            width: '95%',
            marginTop: '15%',
            marginLeft: '2.5%',
        },
        input: {
            width: '95%',
            marginTop: '5%',
            marginLeft: '2.5%',
        },
        registerBtn: {},
        loginBtn: {},
        grid: {
            marginTop: '20%',
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
                label="Username"
                defaultValue={username}
                style={style.input}
                onChangeText={text => setUsername(text)}
            />
            {errUsername && <Text style={style.textErr}>At least 2 characters !</Text>}
            <TextInput
                secureTextEntry={true}
                label="Password"
                defaultValue={password}
                style={style.input}
                onChangeText={password => setPassword(password)}
            />
            {errPass && <Text style={style.textErr}>At least 8 characters !</Text>}
            <TextInput
                secureTextEntry={true}
                label="Password confirmation"
                defaultValue={passwordVerif}
                style={style.input}
                onChangeText={password => setPasswordVerif(password)}
            />
            {errPassVerif && <Text style={style.textErr}>Not the same password !</Text>}
            {errRegister && <Text style={style.textErr}>Email/username already used !</Text>}
            <FlatGrid style={style.grid}
                      data={[
                          <Button style={style.registerBtn} icon="account-plus" mode="contained" dark={true}
                                  onPress={() => navigation.push('Root')}>
                              Login
                          </Button>,
                          <Button style={style.loginBtn} icon="login-variant" mode="contained" dark={true}
                                  onPress={() => submitForm()}>
                              Create
                          </Button>]} renderItem={({item}) => item}/>
        </>
    );
};

export default Register;
