import config from '../config'
import currencyFormatter from 'currency-formatter'

export const getCurrency = () => {
  return config.currency
}

export const sumExpenses = (expenses) => {
  let total = 0
  expenses.forEach((expense) => total += expense.cost)
  return total
}

export const moneyFormat = (amount, abs = true) => 
  currencyFormatter.format(abs ? Math.abs(amount) : amount, { code: getCurrency() })