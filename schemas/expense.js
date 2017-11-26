import mongoose, {
  Schema,
} from 'mongoose'

// Schemas
export const ExpenseSchema = new Schema({
  code: { type: Number, required: true },
  chatID:  { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  cost: { type: Number, required: true },
  tags: [{ type: String, trim: true }],
  date: { type: Date, default: Date.now },
  addedBy: {
    id: Number,
    username: String,
    firstName: String,
    lastName: String,
  },
  location: {
    name: { type: String, trim: true },
    geo: {
      lat: Number,
      long: Number,
    },
  }
})

export default mongoose.model('Expense', ExpenseSchema)