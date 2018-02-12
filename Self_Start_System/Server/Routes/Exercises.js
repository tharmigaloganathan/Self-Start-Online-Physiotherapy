var express = require('express');
var router = express.Router();
var Exercises = require('../Models/Exercise');

router.route('/')
    .post(function (request, response) {
        Exercises.add(request.body.exercise).then(function(exercise){
            response.json({exercise: exercise});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Exercises.getAll().then(function(exercises){
            response.json({exercise: exercises});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:exercise_id')
    .get(function (request, response) {
        Exercises.getOne(request.params.exercise_id).then(function(exercise){
            response.json({exercise: exercise});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        Exercises.update(request.params.exercise_id, request.body.exercise).then(function(exercise){
            response.json({exercise: exercise});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        Exercises.deleteOne(request.params.exercise_id).then(function(exercise){
            res.json({success: true, message: 'exercise deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
