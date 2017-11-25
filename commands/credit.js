import db from '../db'
import Expense from '../schemas/expense'
import { get } from 'lodash'

const getCost = (msg) => {
  const cost = get(msg.match(/\/credit ([\d.,]+)/), '1', null)
  return cost ? Number(cost.replace(',', '.')) : null
}

const getDescription = (msg) => {
  return get(msg.match(/\/credit [\d.,]+([^#|@]+)/), '1', '').trim()
}

const getTags = (msg) => {
  return msg.match(/(#\w+)/g) || []
}

const getLocationName = (msg) => {
  return get(msg.match(/@([^#]+)/), '1', '').trim()
}

const creditCommand = (bot, command) => {
  const { 
    message_id,
    text,
    chat,
    from,
  } = command
  const expense = new Expense({
    code: message_id,
    chatID: chat.id,
    addedBy: {
      id: from.id,
      username: from.username,
      firstName: from.first_name,
      lastName: from.last_name,
    },
    description: getDescription(text),
    cost: getCost(text),
    tags: getTags(text),
    location: {
      name: getLocationName(text),
    }
  })

  expense.save((err, savedExpense) => {
    if (err) {
      bot.sendMessage(
        command.chat.id, 
        'Sorry, your credit couldn\'t be saved'
      )
      return
    }
    bot.sendMessage(
      command.chat.id, 
      `Credit added, the ticket code is: <strong>${savedExpense.code}</strong>`,
      { parse_mode : 'HTML' }
    )
  })
}

export default creditCommand