const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
  _id: { type: Number, required: true, min: 6 },
  password: { type: String, required: true, minlength: 6, maxlength: 200 }
});

module.exports = mongoose.model('Room', RoomSchema);