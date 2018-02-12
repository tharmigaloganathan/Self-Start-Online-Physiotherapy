var express = require('express');
var router = express.Router();
var QuestionTypes = require('../Models/QuestionType');

router.route('/')
    .post(function (request, response) {
        QuestionTypes.add(request.body.questionType).then(function(questionType){
            response.json({questionType: questionType});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        QuestionTypes.getAll().then(function(questionTypes){
            response.json({questionType: questionTypes});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        QuestionTypes.getOne(request.params.object_id).then(function(questionType){
            response.json({questionType: questionType});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        QuestionTypes.update(request.params.object_id, request.body.questionType).then(function(questionType){
            response.json({questionType: questionType});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        QuestionTypes.deleteOne(request.params.object_id).then(function(questionType){
            res.json({success: true, message: 'questionType deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
