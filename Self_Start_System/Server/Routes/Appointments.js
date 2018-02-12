var express = require('express');
var router = express.Router();
var Appointment = require('../Models/Appointment');

router.route('/')
    .post(function (request, response) {
        Appointment.add(request.body.appointment).then(function(appointment){
            response.json({appointment: appointment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Appointment.getAll().then(function(appointments){
            response.json({appointment: appointments});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:appointment_id')
    .get(function (request, response) {
        Appointment.getOne(request.params.appointment_id).then(function(appointment){
            response.json({appointment: appointment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        Appointment.update(request.params.appointment_id, request.body.appointment).then(function(appointment){
            response.json({appointment: appointment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        Appointment.deleteOne(request.params.appointment_id).then(function(appointment){
            res.json({success: true, message: 'appointment deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;

