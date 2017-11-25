import TelegramBot from 'node-telegram-bot-api'
import config from './config'
import commands from './commands'
import { keys } from 'lodash'
import './db'

const bot = new TelegramBot(config.token, { polling: true })

// Make commands listen to bots
keys(commands).forEach((command) => {
  bot.onText(new RegExp(`/${command}`), (msg) => commands[command](bot, msg))    
})