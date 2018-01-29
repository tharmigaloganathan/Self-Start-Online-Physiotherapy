var express = require('express');
var router = express.Router();
var Appointment = require('../models/Appointment');

router.route('/')
    .post(function (request, response) {
        var appointment = new Appointment.Model(request.body.appointment);
        if (!appointment.date){
            response.json({success: false, message: "No date detected."});
        } else if (!appointment.reason){
            response.json({success: false, message: "No reason detected."});
        } else if (!appointment.other){
            response.json({success: false, message: "No other detected."});
        } else if (!appointment.patientProfile){
            response.json({success: false, message: "No patientProfile detected."});
        } else {
            appointment.save(function (error) {
                if (error) response.send(error);
                response.json({appointment: appointment});
            });
        }
    })
    .get(function (request, response) {
        Appointment.Model.find(function (error, appointments) {
            if (error) response.send(error);
            response.json({appointment: appointments});
        });
    });

router.route('/:appointment_id')
    .get(function (request, response) {
        Appointment.Model.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({appointment: appointment});
            }
        });
    })
    .put(function (request, response) {
        Appointment.Model.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.appointment.date){
                    appointment.date = request.body.appointment.date;
                } else if (request.body.appointment.reason){
                    appointment.reason = request.body.appointment.reason;
                } else if (request.body.appointment.other){
                    appointment.other = request.body.appointment.other;
                } else if (request.body.appointment.patientProfile){
                    appointment.patientProfile = request.body.appointment.patientProfile;
                }
                appointment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({appointment: appointment});
                    }
                });
            }
        });
    })
    .delete(function (req, res) {
        if (!req.params.appointment_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Appointment.Model.findById(req.params.appointment_id, function (err, appointment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    appointment.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'form deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
