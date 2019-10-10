const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();

const Quiz = require('../models/quiz');
const Auth = require('../middlewares/auth');

router.post('/create',Auth.authenticateAdmin,(req,res,next)=>{
    
    req.checkBody('name', 'Quiz name is required').notEmpty();
    req.checkBody('startTime', 'Start Time is required').notEmpty();
    req.checkBody('endTime', ' End Time is required').notEmpty();
    req.checkBody('secretKey', 'Secret is required').notEmpty();
    req.checkBody('duration', 'Quiz Duration is required').notEmpty();
    const errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
          messages.push(error);
        });
        return res.status(200).json({
            status: 0,
            msg: messages,

        });
      }
    let quiz = new Quiz(req.body);
    Quiz.findOne({'name':req.body.name},(err,Quiz)=>{
        if(err){
            return res.status(500).json({
                status: 0,
                err:err
            })
        }
        if(Quiz){
            return res.status(200).json({
                status: 1,
                msg:'Quiz Already Exist'
            })
        }else{
            quiz.save()
            .then(result => {
                res.status(201).json({
                    status: 1,
                    msg: "Quiz created :)"
                });
            })
            .catch(err => {
                //console.log(err);
                res.status(500).json({
                    status: 0,
                    error: "Internal Server Error"
                });
            });
        }

    })


})


module.exports = router;