export const sumExpenses = (expenses) => {
  let total = 0
  expenses.forEach((expense) => total += expense.cost)
  return total
}