import {Module} from '@nestjs/common';
import {HttpModule} from './modules/http/http.module';
import {BotTelegramModule} from './modules/bot-telegram/botTelegram.module';

@Module({
    imports: [
        HttpModule,
        BotTelegramModule
    ],
})
export class ApplicationModule {
}
