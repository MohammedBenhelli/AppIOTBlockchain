import Config from 'react-native-config';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class useAPI {
    static async requestBackend(url: string, method: string = 'GET', token: any = null, body: any = null) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if (body) options.body = JSON.stringify(body);
        const res = await fetch(`${Config.API_URL || 'https://2fd920ecc7d8.ngrok.io'}/api/${url}`, options);
        return await res.json();
    }

    static async requestPrinter(url: string, method: string = 'GET', token: any = null, body: any = null, json: boolean = true) {
        const ip = await AsyncStorage.getItem('ip');
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if (body) options.body = JSON.stringify(body);
        const res = await fetch(`${ip || ''}${url}`, options);
        if (json) return await res.json();
        return res;
    }
}
;
