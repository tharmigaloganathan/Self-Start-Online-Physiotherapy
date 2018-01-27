var express = require('express');
var router = express.Router();
var Questions = require('../models/Question');

router.route('/')
    .post(function (request, response) {
        var question = new Questions.Model(request.body.question);
        if (!question.questionText){
            response.json({success: false, message: "No questionText detected."});
        } else if (!question.helpDescription){
            response.json({success: false, message: "No helpDescription detected."});
        } else if (!question.order){
            response.json({success: false, message: "No order detected."});
        } else if (!question.questionType){
            response.json({success: false, message: "No questionType detected."});
        } else if (!question.form){
            response.json({success: false, message: "No form detected."});
        } else {
            question.save(function (error) {
                if (error) response.send(error);
                response.json({question: question});
            });
        }
    })
    .get(function (request, response) {
        Questions.Model.find(function (error, questions) {
            if (error) response.send(error);
            response.json({question: questions});
        });
    });

router.route('/:question_id')
    .get(function (request, response) {
        Questions.Model.findById(request.params.question_id, function (error, question) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({question: question});
        }
        });
    })
    .put(function (request, response) {
        Questions.Model.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.question.questionText){
                    question.questionText = request.body.question.questionText;
                } else if (request.body.question.helpDescription){
                    question.helpDescription = request.body.question.helpDescription;
                } else if (request.body.question.order){
                    question.order = request.body.question.order;
                } else if (request.body.question.questionType){
                    question.questionType = request.body.question.questionType;
                } else if (request.body.question.form){
                    question.form = request.body.question.form;
                }
                question.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({question: question});
                    }
                });
            }
        });
    })
    .delete(function (req, res) {
        if (!req.params.question_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Questions.Model.findById(req.params.question_id, function (err, question) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    question.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'question deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
