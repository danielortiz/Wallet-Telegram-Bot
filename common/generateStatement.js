import moment from 'moment'
import { sumExpenses, moneyFormat } from './money'

export const generateStatement = (expenses = []) => {
  const totalBalance = sumExpenses(expenses) 
  
  const statement = expenses
    .map((expense) => {
      const date = moment(expense.date).format('DD/MM')
      const expenseReceipt = [
        `${expense.code} - ${date}`,
        expense.description,
        `${
          moneyFormat(expense.cost)
        }${expense.cost > 0 ? ' (credit)' : ''}`,
        '-----',
      ]
      return expenseReceipt.join('\n')
    })

  statement.push(`Total: ${moneyFormat(totalBalance, false)}`)
  return `<code>${statement.join('\n')}</code>`
}