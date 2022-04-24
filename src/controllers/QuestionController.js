// Model
const Question = require('../models/Question');
const Room = require('../models/Room');

const bcrypt = require('bcryptjs');
const { createAQuestionValidate } = require('../controllers/validate');

const QuestionController = {
  index: async (req, res) => {
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const password = req.body.password;
  
    try { 
      const verifiedRoom = await Room.findById({ _id: roomId });

      // password comparing
      const passwordMatch = bcrypt.compareSync(password, verifiedRoom.password);

      if(!passwordMatch) {
        res.render('passincorrect', { roomId });
      } else {
        if(action === 'delete') {
          await Question.findByIdAndDelete(questionId);
          res.redirect(`/room/${roomId}`);
        } else if(action === 'check') {
          await Question.updateOne({ _id: questionId }, { $set: { read: true }});
          res.redirect(`/room/${roomId}`);
        }
      }
    } catch(err) {
      res.status(400).send(err.message);
    }
  },

  create: async (req, res) => {
    const title = req.body.question;
    const roomId = req.params.room; 

    // validation 
    const { error } = createAQuestionValidate({ title, room: roomId });
    if(error) return res.status(400).send(error.message);

    try {
      const question = new Question({
        title,
        room: Number(roomId)
      });

      await question.save();

      res.redirect(`/room/${roomId}`);
    } catch(err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = QuestionController;