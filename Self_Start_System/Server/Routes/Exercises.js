var express = require('express');
var router = express.Router();
var Exercises = require('../models/Exercise');

router.route('/')
    .post(function (request, response) {
        console.log("within exercises post route, request body has: ", request.body);
        var exercise = new Exercises.Model(request.body);
        console.log("successfully retrieved exercise from post request, trying to save: ", exercise);
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
        } else {
            exercise.save(function (error) {
                console.log("exercise has all values, saving..");
                if (error) response.send(error);
                response.json({exercise: exercise});
            });
        }
    })

    .get(function (request, response) {
        console.log("within exercises get all route");
        Exercises.Model.find(function (error, exercises) {
            if (error) response.send(error);
            response.json({exercises: exercises});
        });
    });

router.route('/:exercise_id')
    .get(function (request, response) {
        Exercises.Model.findById(request.params.exercise_id, function (error, exercise) {
            console.log("within find single exercise route, fetching ", exercise);
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exercise: exercise});
            }
        });
    })
    .put(function (request, response) {
        console.log("within the exercise put route");
        Exercises.Model.findById(request.params.exercise_id, function (error, exercise) {
            console.log("retrieved following to edit: ", exercise);
            if (error) {
                response.send({error: error});
            }
            else {
                console.log("assigning the following new changed values to the one we pulled from database: ", request.body);
                // if (request.body.name){
                    exercise.name = request.body.name;
                // } else if (request.body.exercise.description){
                    exercise.description = request.body.description;
                // } else if (request.body.exercise.objectives){
                    exercise.objectives = request.body.objectives;
                // } else if (request.body.exercise.authorName){
                    exercise.authorName = request.body.authorName;
                // } else if (request.body.exercise.actionSteps){
                    exercise.actionSteps = request.body.actionSteps;
                // } else if (request.body.exercise.location){
                    exercise.location = request.body.location;
                // } else if (request.body.exercise.frequency){
                    exercise.frequency = request.body.frequency;
                // } else if (request.body.exercise.duration){
                    exercise.duration = request.body.duration;
                // } else if (request.body.exercise.targetDate){
                    exercise.targetDate = request.body.targetDate;
                // } else if (request.body.exercise.multimediaURL){
                    exercise.multimediaURL = request.body.multimediaURL;
                // } else if (request.body.exercise.rehabilitationPlan){
                    exercise.rehabilitationPlan = request.body.rehabilitationPlan;

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
