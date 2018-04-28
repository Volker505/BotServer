import {Component} from '@nestjs/common';
import * as fetch from 'node-fetch';

@Component()
export class OauthSevice {
    constructor() {
    }


    async oauth(data: { code: string, idChat: string }, site: string): Promise<any> {
        console.log(site);
        return await fetch(`http://localhost:8081/oauth/${site}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                console.log(res);
            })
    }

}
