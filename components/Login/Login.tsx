import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
// @ts-ignore
import styled from 'styled-components/native';

// @ts-ignore
const Login = ({navigation}) => {
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = async () => {

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
        passwordInput: {
            width: '95%',
            marginTop: '5%'
        },
        registerBtn: {},
        loginBtn: {},
        grid: {
            marginTop: '40%'
        }
    }

    return (<>
            <TextInput
                label="Email"
                defaultValue={text}
                style={style.emailInput}
                onChangeText={text => setText(text)}
            />
            <TextInput
                secureTextEntry={true}
                label="Password"
                defaultValue={password}
                style={style.passwordInput}
                onChangeText={password => setPassword(password)}
            />
            <FlatGrid style={style.grid}
                      data={[<Button style={style.registerBtn} icon="account-plus" mode="contained" dark={true}
                                     onPress={() => navigation.push('Register')}>
                          Register
                      </Button>,
                          <Button style={style.loginBtn} icon="login-variant" mode="contained" dark={true}
                                  onPress={() => submitForm()}>
                              Login
                          </Button>]} renderItem={({item}) => item}/>

        </>
    );
};

export default Login;
