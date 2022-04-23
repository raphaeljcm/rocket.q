// Models
const Room = require('../models/Room');
const Question = require('../models/Question');

const bcrypt = require('bcryptjs');

const RoomController = {
  create: async (req, res) => {
    try {
      let roomId = "";
      let roomExistsId = true;
      const password = req.body.password;    
      
      // checking if this id already exists 
      while(roomExistsId) {
        for(let i = 0; i < 6; i++) {
          roomId += Math.floor(Math.random() * 10).toString();
        }
        roomExistsId = await Room.findById({ _id: roomId });
      }

      const room = new Room({
        _id: Number(roomId),
        password: bcrypt.hashSync(password)
      }); 

      await room.save();
    
      res.redirect(`/room/${roomId}`);
    } catch(err) {
      res.status(400).send(err.message);
    }  
  },

  open: async (req, res) => {
    try {
      const roomId = req.params.room;
      const allQuestions = await Question.find({ room: roomId });
      const allQuestionsRead = await Question.find({ room: roomId, read: true });

      res.render('room', { roomId, questions: allQuestions, questionsRead: allQuestionsRead });
    } catch(err) {
      res.send(err.message);
    }
  }
}

module.exports = RoomController;