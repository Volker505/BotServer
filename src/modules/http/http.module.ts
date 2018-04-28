import { Module } from '@nestjs/common';
import { MainHttpController } from './mainHttp.controller';
import { OauthSevice } from './oauth.service';

@Module({
  controllers: [
    MainHttpController
  ],
  components: [
    OauthSevice
  ]
})
export class HttpModule {
}
