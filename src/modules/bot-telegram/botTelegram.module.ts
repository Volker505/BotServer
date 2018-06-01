import {Module} from '@nestjs/common';
import {BotTelegramService} from './bot-telegram.service';
import {BotTelegramController} from './bot-telegram.controller';
import {HttpModule} from '../http/http.module';


@Module({
    components: [BotTelegramService],

    controllers: [BotTelegramController],

    imports: [HttpModule],
})
export class BotTelegramModule {
}