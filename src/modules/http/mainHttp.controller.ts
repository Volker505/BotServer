import {Controller, Get, Param, Query} from '@nestjs/common';
import {OauthSevice} from './oauth.service';

@Controller('main')
export class MainHttpController {
    constructor(private oauthService: OauthSevice) {
    }

    @Get('vk')
    async oauthCodeVk(@Query() params): Promise<any> {
        return await this.oauthService.oauthVk(params['code'], params['id']);
    }
//http://localhost:3220/main/fb
    @Get('fb')
    async oauthCodeFb(@Query() params): Promise<any> {// todo тестировать
        return await this.oauthService.oauthFb(params['code'], params['id']);
    }

    @Get('registration')//todo
    async registration(): Promise<any>{
        return await this.oauthService.createNewUser('1', 'maxxx');
    }
}

