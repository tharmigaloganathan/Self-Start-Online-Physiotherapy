var express = require('express');
var router = express.Router();
var Payments = require('../models/Payment');

router.route('/')
    .post(function (request, response) {
        var payments = new Payments.Model(request.body.payments);
        if (!payments.amount){
            response.json({success: false, message: "No amount detected."});
        } else if (!payments.note){
            response.json({success: false, message: "No note detected."});
        } else if (!payments.patientProfile){
            response.json({success: false, message: "No patientProfile detected."});
        } else {
            payments.save(function (error) {
                if (error) response.send(error);
                response.json({payments: payments});
            });
        }
    })
    .get(function (request, response) {
        Payments.Model.find(function (error, payments) {
            if (error) response.send(error);
            response.json({payments: payments});
        });
    });

router.route('/:payments_id')
    .get(function (request, response) {
        Payments.Model.findById(request.params.payments_id, function (error, payments) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({payments: payments});
            }
        });
    })
    .put(function (request, response) {
        Payments.Model.findById(request.params.payments_id, function (error, payments) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.payments.amount){
                    payments.amount = request.body.payments.amount;
                } else if (request.body.payments.note){
                    payments.note = request.body.payments.note;
                } else if (request.body.payments.patientProfile){
                    payments.patientProfile = request.body.payments.patientProfile;
                } else if (request.body.payments.dayTimeStamp) {
                    payments.dayTimeStamp = request.body.payments.dayTimeStamp;
                }
                payments.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({payments: payments});
                    }
                });
            }
        });

    })
    .delete(function (req, res) {
        if (!req.params.payments_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Payments.Model.findById(req.params.payments_id, function (err, payments) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    payments.remove(function (err) {
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
