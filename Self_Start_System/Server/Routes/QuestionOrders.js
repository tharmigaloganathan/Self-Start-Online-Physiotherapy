var express = require('express');
var router = express.Router();
var QuestionOrders = require('../Models/QuestionOrder');

router.route('/')
    .post(function (request, response) {
        QuestionOrders.add(request.body).then(function(questionOrder){
            response.json({questionOrder: questionOrder});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        QuestionOrders.getAll().then(function(questionOrders){
            console.log(questionOrders);
            response.json({questionOrder: questionOrders});
        }).catch(function(err){
            console.log(err);
            response.json({success: false, message: err});
        })
    });

router.route('/:questionOrder_id')
    .get(function (request, response) {
        if (!request.params.questionOrder_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        QuestionOrders.getOne(request.params.questionOrder_id).then(function(questionOrder){
            response.json({questionOrder: questionOrder});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.questionOrder_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        QuestionOrders.update(request.params.questionOrder_id, request.body).then(function(questionOrder){
            response.json({questionOrder: questionOrder});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.questionOrder_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        QuestionOrders.deleteOne(request.params.questionOrder_id).then(function(questionOrder){
            response.json({success: true, message: 'questionOrder deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
