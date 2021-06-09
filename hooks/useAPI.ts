import Config from 'react-native-config'

export default class useAPI {
    static async request(url: string, method: string = 'GET',token: any = null, body: any = null) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if (body) options.body = JSON.stringify(body);
        const res = await fetch(`${Config.API_URL || 'https://bddded9aeb4c.ngrok.io' }/api/${url}`, options);
        return await res.json();
    }
}
;
