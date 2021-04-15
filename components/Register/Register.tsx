import React, {useState} from 'react';
import {TextInput, Button, Text} from 'react-native-paper';
// @ts-ignore
import {FlatGrid} from "react-native-super-grid";
import AsyncStorage from '@react-native-async-storage/async-storage';


// @ts-ignore
const Register = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerif, setPasswordVerif] = useState('');

    const submitForm = async () => {
        if (password.length > 7 && password === passwordVerif) {
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
                await AsyncStorage.setItem('token', resJSON.csrfToken);
                navigation.push('Home');
                console.log(resJSON);
            } catch (e) {
                console.log(e)
            }
        }
    }

    const style = {
        emailInput: {
            width: '95%',
            marginTop: '15%'
        },
        input: {
            width: '95%',
            marginTop: '5%'
        },
        registerBtn: {},
        loginBtn: {},
        grid: {
            marginTop: '40%',
            marginLeft: '3%'
        }
    }

    return (<>
            <TextInput
                label="Email"
                defaultValue={email}
                style={style.emailInput}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Username"
                defaultValue={username}
                style={style.input}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                secureTextEntry={true}
                label="Password confirmation"
                defaultValue={passwordVerif}
                style={style.input}
                onChangeText={password => setPasswordVerif(password)}
            />
            <TextInput
                secureTextEntry={true}
                label="Password"
                defaultValue={password}
                style={style.input}
                onChangeText={password => setPassword(password)}
            />
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
