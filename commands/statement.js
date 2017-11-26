import db from '../db'
import Expense from '../schemas/expense'
import pad from 'pad'
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import { sumExpenses } from '../common/money'

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
    const totalBalance = sumExpenses(response) 
     
    const statement = response
      .map((expense) => {
        const date = moment(expense.date).format('DD/MM')
        const expenseReceipt = [
          `${expense.code} - ${date}`,
          expense.description,
          `${
            currencyFormatter.format(Math.abs(expense.cost), { code: 'BRL' })
          }${expense.cost > 0 ? ' (credit)' : ''}`,
          '-----',
        ]
        return expenseReceipt.join('\n')
      })

    statement.push(`Total: ${currencyFormatter.format(Math.abs(totalBalance), { code: 'BRL' })}`)

    bot.sendMessage(
      chat.id, `<code>${statement.join('\n')}</code>`, 
      { parse_mode : "HTML" }
    )
  })
}
export default statementCommand