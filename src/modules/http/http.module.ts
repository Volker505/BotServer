import {Module} from '@nestjs/common';
import {MainHttpController} from './mainHttp.controller';
import {OauthSevice} from './oauth.service';


@Module({
    controllers: [
        MainHttpController
    ],
    components: [
        OauthSevice
    ],

    exports: [
        OauthSevice
    ]
})
export class HttpModule {
}
