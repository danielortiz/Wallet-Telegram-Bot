import db from '../db'
import Expense from '../schemas/expense'
import { generateStatement } from '../common/generateStatement'

const statementCommand = (bot, command) => {
  const { 
    message_id,
    text,
    chat,
  } = command
  
  Expense.find({
    chatID: chat.id
  }, (error, response) => {
    if (error) {
      console.error(error)
      return
    }

    bot.sendMessage(
      chat.id, generateStatement(response), 
      { parse_mode : "HTML" }
    )
  })
}
export default statementCommand