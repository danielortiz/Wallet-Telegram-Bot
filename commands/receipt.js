import db from '../db'
import Expense from '../schemas/expense'
import { generateReceipt } from '../common/generateReceipt'

const receiptCommand = (bot, command) => {
  const { 
    message_id,
    text,
    chat,
  } = command
  const code = Number(
    (text.match(/(\d+)/) || [])[1]
  )
  if (isNaN(code)) {
    bot.sendMessage(chat.id, 'Please, provide a valid ticket code')
  }
  Expense.findOne({
    chatID: chat.id,
    code,
  }, (error, response) => {
    if (error) {
      console.error(error)
      return
    }
    if (!response) {
      bot.sendMessage(chat.id, 'Ticket not found') 
      return
    }
    
    bot.sendMessage(chat.id, generateReceipt(response), { parse_mode : "HTML" })
  })
}
export default receiptCommand