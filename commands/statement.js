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
      return
    }
    const totalBalance = sumExpenses(response) 

    const statement = response
      .map((expense) => {
        const date = moment(expense.date).format('DD/MM')
        const expenseName = ('(' + expense.code + ') ' + expense.description).slice(0, 18)  + ' '
        const price = pad(15, 
          currencyFormatter.format(expense.cost, { code: 'BRL', symbol: (expense.cost > 0 ? ' +' : '') })
        , '-')
        
        return `${date} - ${pad(expenseName, 21, '-')}${price}`
      })

    statement.push('--------------------------------------------')
    statement.push(`Total: ${currencyFormatter.format(totalBalance, { code: 'BRL' })}`)
      

    bot.sendMessage(
      chat.id, `<code>${statement.join('\n')}</code>`, 
      { parse_mode : "HTML" }
    )
  })
}
export default statementCommand