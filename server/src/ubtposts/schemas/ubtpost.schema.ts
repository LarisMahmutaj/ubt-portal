import * as mongoose from 'mongoose';

export const UbtpostSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  user_id: String,
});
