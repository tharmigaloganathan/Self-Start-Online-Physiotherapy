var express = require('express');
var router = express.Router();
var Payments = require('../Models/Payment');

router.route('/')
    .post(function (request, response) {
        Payments.add(request.body).then(function(payment){
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

router.route('/get-payment-by-patient-id')
  .put(function (request, response) {
    console.log("get-payment-by-patient-id ");
    if(!request.body.patientProfileID){
      response.json({success: false, message: 'patientProfileID was not provided'});
    }
    Payments.getAllByPatientProfileID(request.body.patientProfileID).then(function(payment){
      response.json({payment: payment});
    }).catch(function(err){
      response.json({success: false, message: err});
    })
  });

router.route('/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Payments.getOne(request.params.object_id).then(function(payment){
            response.json({payment: payment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Payments.update(request.params.object_id, request.body).then(function(payment){
            response.json({payment: payment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Payments.deleteOne(request.params.object_id).then(function(payment){
            response.json({success: true, message: 'payment deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
