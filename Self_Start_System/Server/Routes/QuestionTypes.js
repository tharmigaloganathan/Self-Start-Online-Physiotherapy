var express = require('express');
var router = express.Router();
var QuestionsTypes = require('../models/QuestionType');

router.route('/')
    .post(function (request, response) {
        var questionType = new QuestionTypes.Model(request.body.questionType);
        if (!questionType.name){
            response.json({success: false, message: "No name detected."});
        } else if (!questionType.questions){
            response.json({success: false, message: "No questions detected."});
        } else {
            questionType.save(function (error) {
                if (error) response.send(error);
                response.json({questionType: questionType});
            });
        }
    })
    .get(function (request, response) {
        QuestionTypes.Model.find(function (error, questionTypes) {
            if (error) response.send(error);
            response.json({questionsType: questionsTypes});
        });
    });

router.route('/:questionType_id')
    .get(function (request, response) {
        QuestionTypes.Model.findById(request.params.questionType_id, function (error, questionType) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({questionType: questionType});
            }
        });
    })
    .put(function (request, response) {
        if (!request.body.questionType.name){
            response.json({success: false, message: "No name detected."});
        } else if (!request.body.questionType.questions){
            response.json({success: false, message: "No questions detected."});
        } else {
            QuestionTypes.Model.findById(request.params.questionType_id, function (error, questionType) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    questionType.name = request.body.questionType.name;
                    questionType.questions = request.body.questionType.questions;
                    questionType.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        } else {
                            response.json({questionType: questionType});
                        }
                    });
                }
            });
        }
    })
    .delete(function (req, res) {
        if (!req.params.questionType_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            QuestionTypes.Model.findById(req.params.questionType_id, function (err, questionType) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    questionType.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'questionType deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
