var expresponses = require('express');
var router = expresponses.Router();
var Exercises = require('../models/Exercise');

router.route('/exercises')
    .post(function (request, response) {
        var exercise = new Exercises.Model(request.body.exercise);
        if (!exercise.name){
            response.json({success: false, message: "No name detected."});
        } else if (!exercise.description) {
            response.json({success: false, message: "No description detected."});
        } else if (!exercise.objectives) {
            response.json({success: false, message: "No objectives detected."});
        } else if (!exercise.authorName) {
            response.json({success: false, message: "No authorName detected."});
        } else if (!exercise.actionSteps) {
            response.json({success: false, message: "No actionSteps detected."});
        } else if (!exercise.location) {
            response.json({success: false, message: "No location detected."});
        } else if (!exercise.frequency) {
            response.json({success: false, message: "No frequency detected."});
        } else if (!exercise.duration) {
            response.json({success: false, message: "No duration detected."});
        } else if (!exercise.targetDate) {
            response.json({success: false, message: "No targetDate detected."});
        } else if (!exercise.multimediaURL) {
            response.json({success: false, message: "No multimediaURL detected."});
        } else if (!exercise.rehabilitationPlan) {
            response.json({success: false, message: "No rehabilitationPlan detected."});
        } else {
            exercise.save(function (error) {
                if (error) response.send(error);
                response.json({exercise: exercise});
            });
        }
    })

    .get(function (request, response) {
        Exercises.Model.find(function (error, exercises) {
            if (error) response.send(error);
            response.json({exercises: exercises});
        });
    });

router.route('/exercises/exercise_id')
    .get(function (request, response) {
        Exercises.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exercise: exercise});
            }
        });
    })
    .put(function (request, response) {
        Exercises.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.exercise.name){
                    exercise.name = request.body.exercise.name;
                } else if (request.body.exercise.description){
                    exercise.description = request.body.exercise.description;
                } else if (request.body.exercise.objectives){
                    exercise.objectives = request.body.exercise.objectives;
                } else if (request.body.exercise.authorName){
                    exercise.authorName = request.body.exercise.authorName;
                } else if (request.body.exercise.actionSteps){
                    exercise.actionSteps = request.body.exercise.actionSteps;
                } else if (request.body.exercise.location){
                    exercise.location = request.body.exercise.location;
                } else if (request.body.exercise.frequency){
                    exercise.frequency = request.body.exercise.frequency;
                } else if (request.body.exercise.duration){
                    exercise.duration = request.body.exercise.duration;
                } else if (request.body.exercise.targetDate){
                    exercise.targetDate = request.body.exercise.targetDate;
                } else if (request.body.exercise.multimediaURL){
                    exercise.multimediaURL = request.body.exercise.multimediaURL;
                } else if (request.body.exercise.rehabilitationPlan){
                    exercise.rehabilitationPlan = request.body.exercise.rehabilitationPlan;
                }
                exercise.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({exercise: exercise});
                    }
                });
            }
        });
    })
    .delete(function (req, response) {
        if (!req.params.exercise_id) {
            response.json({success: false, message: 'id was not provided'});
        } else {
            Exercises.Model.findById(req.params.exercise_id, function (err, exercise) {
                if (err) {
                    response.json({success: false, message: err});
                } else {
                    exercise.remove(function (err) {
                        if (err){
                            response.json({success: false, message: err});
                        } else {
                            response.json({success: true, message: 'exercise deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
