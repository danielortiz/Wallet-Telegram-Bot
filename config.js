export default {
  token: process.env.BOT_TOKEN,
  dbUrl: process.env.MONGODB_URI,
  currency: process.env.CURRENCY || 'USD',
}
