const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  title: { type: String, required: true },
  read: { type: Boolean, default: false },
  room: { type: Number, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);