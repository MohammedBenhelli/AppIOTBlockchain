import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
// @ts-ignore
import styled from 'styled-components/native';
import {FlatGrid} from "react-native-super-grid";

// @ts-ignore
const Register = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerif, setPasswordVerif] = useState('');

    const submitForm = async () => {
        console.log('ici')
    }

    const View = styled.View`
      flex: 1;
      width: 100%;
      align-items: center;

      .icon {
        position: absolute;
      }
    `;

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
            marginTop: '40%'
        }
    }

    return (<View>
            <TextInput
                label="Email"
                value={email}
                style={style.emailInput}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Username"
                value={username}
                style={style.input}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                secureTextEntry={true}
                label="Password confirmation"
                value={passwordVerif}
                style={style.input}
                onChangeText={password => setPasswordVerif(password)}
            />
            <TextInput
                secureTextEntry={true}
                label="Password"
                value={password}
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
        </View>
    );
};

export default Register;
