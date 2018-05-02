import {Controller, Get, Param, Query} from '@nestjs/common';
import {OauthSevice} from './oauth.service';

@Controller('main')
export class MainHttpController {
    constructor(private oauthService: OauthSevice) {
    }

    @Get('vk')
    async oauthCodeVk(@Query() params): Promise<any> {
        return await this.oauthService.oauth(params['code'], params['id'], 'vk');
    }

    @Get('fb/:id')
    async oauthCodeFb(@Query() paramsFb, @Param() dataChat): Promise<any> {
        return await this.oauthService.oauth(paramsFb.code, dataChat.idChat, 'fb');
    }

    @Get('registration')
    async registration(): Promise<any>{
        return await this.oauthService.createNewUser('1', 'maxxx');
    }
}

