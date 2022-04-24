// Models
const Room = require('../models/Room');
const Question = require('../models/Question');

const bcrypt = require('bcryptjs');
const { createRoomValidate, enterRoomValidate } = require('../controllers/validate');

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

      // validation 
      const { error } = createRoomValidate({ _id: Number(roomId), password });
      if(error) return res.status(400).send(error.message);

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
    const roomId = Number(req.params.room);

    // validation 
    const { error } = enterRoomValidate({ url: roomId });
    
    if(error) {
      res.render('index', { page: 'enter-room', error: error.message });
    } else {
        try {
          const allQuestions = await Question.find({ room: roomId });
          const allQuestionsRead = await Question.find({ room: roomId, read: true });
          let isNoQuestions;
    
          const isRoom = await Room.findOne({ _id: roomId });
    
          if(!isRoom) {
            res.render('index', { page: 'enter-room', error: 'Esta sala não existe' });
          } else if(allQuestions.length === 0 && allQuestionsRead.length === 0) {
            isNoQuestions = true;
            res.render('room', { roomId, questions: allQuestions, questionsRead: allQuestionsRead, isNoQuestions });
          } else {
            res.render('room', { roomId, questions: allQuestions, questionsRead: allQuestionsRead, isNoQuestions });
          }

        } catch(err) {
          res.send(err.message);
        }
    } 
  },

  enter: async (req, res) => {
    try {
      const roomId = req.body.roomId;
      
      const isRoom = await Room.findOne({ _id: roomId });
      
      if(!isRoom) {
        res.render('index', { page: 'enter-room', error: 'Esta sala não existe' })
      } else {
        res.redirect(`/room/${roomId}`);
      }
    } catch(err) {
      res.send(err.message);
    }
  }
}

module.exports = RoomController;