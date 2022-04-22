// Models
const Room = require('../models/Room');

const bcrypt = require('bcryptjs');

const RoomController = {
  create: async (req, res) => {
    let roomId = "";
    const password = req.body.password;
  
    // creating the room ID
    for(let i = 0; i < 6; i++) {
      roomId += Math.floor(Math.random() * 10).toString();
    }

    const room = new Room({
      _id: Number(roomId),
      password: bcrypt.hashSync(password)
    });
    
    try {
      await room.save();
    
      res.redirect(`/room/${roomId}`);
    } catch(err) {
      res.status(400).send(err.message);
    }  
  }
}

module.exports = RoomController;