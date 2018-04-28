import {Controller, Get, Param, Query} from '@nestjs/common';
import {OauthSevice} from './oauth.service';

@Controller('main')
export class MainHttpController {
    constructor(private oauthService: OauthSevice) {
    }

    @Get('vk/:idChat')
    async oauthCodeVk(@Query() paramsVk, @Param() dataChat): Promise<any> {
        console.log(11111, paramsVk['code']);
        return await this.oauthService.oauth({code: paramsVk['code'], idChat: dataChat.idChat}, 'vk');
    }


    @Get('fb/:idChat')
    async oauthCodeFb(@Query() paramsFb, @Param() dataChat):Promise<any> {
        return await this.oauthService.oauth({code: paramsFb.code, idChat: dataChat.idChat}, 'fb');
    }
}