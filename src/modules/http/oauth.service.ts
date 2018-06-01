import {Component} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {fbId, fbSec, vkId, vkSec} from '../../share/dataOauth';

@Component()
export class OauthSevice {
    constructor() {
    }

//пример запроса который клиента
//    https://oauth.vk.com/authorize?client_id=6424675&display=page&redirect_uri=http://localhost:3220/main/vk?id=1&scope=friends,offline,wall,photos&response_type=code&v=5.69
    async oauthVk(code: string, idChat: string): Promise<any> {
        const dataUser = await fetch(`https://oauth.vk.com/access_token?client_id=${vkId}&redirect_uri=http://localhost:3220/main/vk?id=${idChat}&client_secret=${vkSec}&code=${code}`)
            .then(data => data.json());
        console.log(dataUser);
        return await this.reqProcessServer('vk', dataUser, idChat);
    }

    //https://www.facebook.com/v3.0/dialog/oauth?client_id=593122744357882&redirect_uri=http://localhost:3220/main/fb&response_type=code&scope=email
    async oauthFb(code: string, idChat: string) {
        const dataUsr = await fetch(`https://graph.facebook.com/v3.0/oauth/access_token?client_id=${fbId}&redirect_uri=http://localhost:3220/main/fb?id=${idChat}&client_secret=${fbSec}&code=${code}`)
            .then(data => data.json());
        //todo проверить данные
        return await this.reqProcessServer('fb', dataUsr, idChat);
    }

    async reqProcessServer(site: string, dataUser: any, idChat: string) {
        return await fetch(`http://localhost:8081/oauth/${site}`, {
            method: 'POST',
            body: JSON.stringify({idChat: idChat, dataSocNetUser: dataUser}),
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
        }).then(data => data.json());//todo проверить результат
        console.log(result);
    }

    ccc() {
        console.log(';;');
    }

}
