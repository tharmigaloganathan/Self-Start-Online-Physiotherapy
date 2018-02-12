var express = require('express');
var router = express.Router();
var Questions = require('../Models/Question');

router.route('/')
    .post(function (request, response) {
        Questions.add(request.body.question).then(function(question){
            response.json({question: question});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Questions.getAll().then(function(questions){
            response.json({question: questions});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Questions.getOne(request.params.object_id).then(function(question){
            response.json({question: question});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Questions.update(request.params.object_id, request.body.question).then(function(question){
            response.json({question: question});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Questions.deleteOne(request.params.object_id).then(function(question){
            res.json({success: true, message: 'question deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
