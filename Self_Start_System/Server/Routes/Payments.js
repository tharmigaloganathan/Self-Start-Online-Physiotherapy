var express = require('express');
var router = express.Router();
var Payments = require('../Models/Payment');

router.route('/')
    .post(function (request, response) {
        Payments.add(request.body.payment).then(function(payment){
            response.json({payment: payment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Payments.getAll().then(function(payments){
            response.json({payment: payments});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Payments.getOne(request.params.object_id).then(function(payment){
            response.json({payment: payment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Payments.update(request.params.object_id, request.body.payment).then(function(payment){
            response.json({payment: payment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Payments.deleteOne(request.params.object_id).then(function(payment){
            res.json({success: true, message: 'payment deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
