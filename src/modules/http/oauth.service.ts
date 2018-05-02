import {Component} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {vkId, vkSec} from '../../share/dataOauth';

@Component()
export class OauthSevice {
    constructor() {
    }

//пример запроса который клиента
//     https://oauth.vk.com/authorize?client_id=6424675&display=page&redirect_uri=http://localhost:3220/main/vk?id=009&scope=friends,photos,offline&response_type=code&v=5.69
    async oauth(code: string, idChat: string, site: string): Promise<any> {
        const dataUser = await fetch(`https://oauth.vk.com/access_token?client_id=${vkId}&redirect_uri=http://localhost:3220/main/vk?id=${idChat}&client_secret=${vkSec}&code=${code}`)
            .then(data => data.json());
        console.log(dataUser);
        return await fetch(`http://localhost:8081/oauth/${site}`, {
            method: 'POST',
            body: JSON.stringify({idChat: idChat, dataSocNetUser: dataUser }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            console.log(res);
        })
    }


    async createNewUser(chatId: string, userName: string) {
        const result = await fetch('http://localhost:8081/oauth/registration', {
            method: 'POST',
            body: JSON.stringify({chatId: chatId, userName: userName}),
            headers: {'Content-Type': 'application/json'}
        }).then( data => data.json());//todo проверить результат
        console.log(result);
    }

}
