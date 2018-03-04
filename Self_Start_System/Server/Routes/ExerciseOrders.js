var express = require('express');
var router = express.Router();
var ExerciseOrders = require('../Models/ExerciseOrder');

router.route('/')
    .post(function (request, response) {
        ExerciseOrders.add(request.body).then(function(exerciseOrder){
            response.json({exerciseOrder: exerciseOrder});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        ExerciseOrders.getAll().then(function(exerciseOrders){
            console.log(exerciseOrders);
            response.json({exerciseOrder: exerciseOrders});
        }).catch(function(err){
            console.log(err);
            response.json({success: false, message: err});
        })
    });

router.route('/:exerciseOrder_id')
    .get(function (request, response) {
        if (!request.params.exerciseOrder_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        ExerciseOrders.getOne(request.params.exerciseOrder_id).then(function(exerciseOrder){
            response.json({exerciseOrder: exerciseOrder});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.exerciseOrder_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        ExerciseOrders.update(request.params.exerciseOrder_id, request.body).then(function(exerciseOrder){
            response.json({exerciseOrder: exerciseOrder});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.exerciseOrder_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        ExerciseOrders.deleteOne(request.params.exerciseOrder_id).then(function(exerciseOrder){
            response.json({success: true, message: 'exerciseOrder deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
