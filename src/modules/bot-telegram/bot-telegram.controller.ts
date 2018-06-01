import {Controller} from '@nestjs/common';
import {TOKEN} from '../../share/configTelegram';
import * as fetch from 'node-fetch';
import {async} from 'rxjs/scheduler/async';

const TelegramBot = require('node-telegram-bot-api');


@Controller('bot-telegram')
export class BotTelegramController {

    public bot: any;

    constructor() {
        this.runBotListener()
    }

    private runBotListener() {
        this.bot = new TelegramBot(TOKEN, {polling: true});

        this.bot.on('message', async(msg) => {
            const chatId = msg.chat.id;
            switch (msg.text){
                case '/start':
                    this.sendText(chatId, '');
                    break;
                case '/help':
                    this.sendText(chatId, '/bindingSocNet\n/bindingNewsPortal');
                    break;
                case '/bindingSocNet':
                    this.generateButtonSocNet(chatId);
                    break;
                case '/bindingNewsPortal':
                    this.generateButtonNewsPortal(chatId);
                    break;
                case 'Новости вк':
                    // let ab = await fetch('http://localhost:8081/api/actualNews_vk/1').then(data => data.json());
                    // console.log(ab);
                    this.bot.sendMessage(chatId, `СПМЫЕ ПОПУЛЯРНЫЕ И ВЕСЕЛЫЕ ГИФКИ СЕГОДНЯ В ВК\n\n (http://image3.thematicnews.com/uploads/images/05/67/30/2016/04/29/b1aae9b1aae9.gif)`);
                    this.bot.sendMessage(chatId, ` (https://s.fishki.net/upload/users/2017/12/12/1382954/b6e83ddb0ba73767ddff11330fbe87c5.gif)`);
                    this.bot.sendMessage(chatId, `А ЕЩЕ ПАРА ПОСТОВ`);
                    this.bot.sendMessage(chatId, `Красивое небо над Белгородом 😎 (https://pp.userapi.com/c846220/v846220914/643d6/TH-XMAdC19I.jpg)`);
                    this.bot.sendMessage(chatId, `(https://pp.userapi.com/c840323/v840323562/8ac96/NH4pP1FVFL8.jpg)`);
                    break;
                case 'Новости фб':

                    break;
                case 'Новости гт':
                    let a = await fetch('http://localhost:8081/api/actualNews_gt/1').then(data => data.json());
                    this.bot.sendMessage(chatId, `ЭТИ НОВОСТИ БУДУТ ИНТЕРЕСНЫ ВАМ СЕГОДНЯ 🙂🙂 ОТ ПОРТАЛА GEEKTIMS\n\n ${a['content']} (${a['img']})`);
                    break;
                case 'Все новости':

                    break;
                default :


            }

            //
            // const chatId = msg.chat.id;
            // let options = {
            //     reply_markup: JSON.stringify({
            //         inline_keyboard: [
            //             [{text: 'VK', callback_data: 'vk'}],
            //             [{text: 'Facebook', callback_data: 'fb'}]
            //         ]
            //     })
            // };
            // this.bot.sendMessage(chatId, 'Access to social networks\n', options);

            // this.bot.sendMessage(chatId, msg.message_id);
        });

        this.bot.on('callback_query', (msg) => {
            const chatId = msg.chat.id;
            // console.log(msg.polling_error);
            this.bot.sendMessage(chatId, 'vk');
        })


    }


    private generateButtonSocNet (chatId: string){
        let options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'VK', callback_data: 'vk'}],
                        [{text: 'Facebook', callback_data: 'fb'}]
                    ]
                })
        };
        this.bot.sendMessage(chatId, 'Доступны следующие социальные сети ', options);
    }

    private generateButtonNewsPortal (chatId: string){
        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'geektimes', callback_data: 'gt'}],
                ]
            })
        };
        this.bot.sendMessage(chatId, 'Доступны следующие новостные порталы', options);
    }

    private sendText (chatId: string, text: string){
        this.bot.sendMessage(chatId, text);
    }


}
