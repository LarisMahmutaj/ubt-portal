import * as mongoose from 'mongoose';

export const UbtpostSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  user_id: String,
});
