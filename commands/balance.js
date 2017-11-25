import db from '../db'
import Expense from '../schemas/expense'
import currencyFormatter from 'currency-formatter'
import { sumExpenses } from '../common/money'
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
      return
    }
    const totalBalance = sumExpenses(response)
    bot.sendMessage(
      chat.id, 
      `your balance is: <strong>${currencyFormatter.format(totalBalance, { code: 'BRL' })}</strong>`, 
      { parse_mode : "HTML" }
    )
  })
}
export default balanceCommand