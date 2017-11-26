import db from '../db'
import Expense from '../schemas/expense'
import { sumExpenses, moneyFormat } from '../common/money'

const balanceCommand = (bot, command) => {
  const { 
    message_id,
    text,
    chat,
    from,
  } = command
  
  Expense.find({
    chatID: chat.id
  }, (error, response) => {
    if (error) {
      console.error(error)
      return
    }
    const totalBalance = sumExpenses(response)
    bot.sendMessage(
      chat.id, 
      `your balance is: <strong>${moneyFormat(totalBalance, false)}</strong>`, 
      { parse_mode : "HTML" }
    )
  })
}
export default balanceCommand