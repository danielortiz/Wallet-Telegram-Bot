import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import { sumExpenses } from './money'

export const generateStatement = (expenses = []) => {
  const totalBalance = sumExpenses(expenses) 
  
  const statement = expenses
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
  return `<code>${statement.join('\n')}</code>`
}