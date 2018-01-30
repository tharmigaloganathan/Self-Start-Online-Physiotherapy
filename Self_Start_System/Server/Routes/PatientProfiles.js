var express = require('express');
var router = express.Router();
var PatientProfile = require('../models/PatientProfile');

router.route('/')
    .post(function (request, response) {
        var patientProfile = new PatientProfile.Model(request.body.patientProfile);
        if (!patientProfile.familyName){
            response.json({success: false, message: "No familyName detected."});
        } else if (!patientProfile.givenName){
            response.json({success: false, message: "No givenName detected."});
        } else if (!patientProfile.email){
            response.json({success: false, message: "No email detected."});
        } else if (!patientProfile.DOB){
            response.json({success: false, message: "No DOB detected."});
        } else if (!patientProfile.postalCode){
            response.json({success: false, message: "No postalCode detected."});
        } else if (!patientProfile.phone){
            response.json({success: false, message: "No phone detected."});
        } else if (!patientProfile.maritalStatus){
            response.json({success: false, message: "No maritalStatus detected."});
        } else if (!patientProfile.healthCardNumber){
            response.json({success: false, message: "No healthCardNumber detected."});
        } else if (!patientProfile.occupation){
            response.json({success: false, message: "No occupation detected."});
        } else if (!patientProfile.others){
            response.json({success: false, message: "No others detected."});
        } else if (!patientProfile.account){
            response.json({success: false, message: "No account detected."});
        } else if (!patientProfile.payments){
            response.json({success: false, message: "No payments detected."});
        } else if (!patientProfile.country){
            response.json({success: false, message: "No country detected."});
        } else if (!patientProfile.province){
            response.json({success: false, message: "No province detected."});
        } else if (!patientProfile.city){
            response.json({success: false, message: "No city detected."});
        } else if (!patientProfile.gender){
            response.json({success: false, message: "No gender detected."});
        } else if (!patientProfile.appointments){
            response.json({success: false, message: "No appointments detected."});
        } else {
            patientProfile.save(function (error) {
                if (error) response.send(error);
                response.json({patientProfile: patientProfile});
            });
        }
    })
    .get(function (request, response) {
        PatientProfile.Model.find(function (error, patientProfiles) {
            if (error) response.send(error);
            response.json({patientProfile: patientProfiles});
        });
    });

router.route('/:patientProfile_id')
    .get(function (request, response) {
        PatientProfile.Model.findById(request.params.patientProfile_id, function (error, patientProfile) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({patientProfile: patientProfile});
            }
        });
    })
    .put(function (request, response) {
        PatientProfile.Model.findById(request.params.patientProfile_id, function (error, patientProfile) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.patientProfile.familyName){
                    patientProfile.familyName = request.body.patientProfile.familyName;
                } else if (request.body.patientProfile.givenName){
                    patientProfile.givenName = request.body.patientProfile.givenName;
                } else if (request.body.patientProfile.email){
                    patientProfile.email = request.body.patientProfile.email;
                } else if (request.body.patientProfile.DOB){
                    patientProfile.DOB = request.body.patientProfile.DOB;
                } else if (request.body.patientProfile.postalCode){
                    patientProfile.postalCode = request.body.patientProfile.postalCode;
                } else if (request.body.patientProfile.phone){
                    patientProfile.phone = request.body.patientProfile.phone;
                } else if (request.body.patientProfile.maritalStatus){
                    patientProfile.maritalStatus = request.body.patientProfile.maritalStatus;
                } else if (request.body.patientProfile.healthCardNumber){
                    patientProfile.healthCardNumber = request.body.patientProfile.healthCardNumber;
                } else if (request.body.patientProfile.occupation){
                    patientProfile.occupation = request.body.patientProfile.occupation;
                } else if (request.body.patientProfile.others){
                    patientProfile.others = request.body.patientProfile.others;
                } else if (request.body.patientProfile.account){
                    patientProfile.account = request.body.patientProfile.account;
                } else if (request.body.patientProfile.payments){
                    patientProfile.payments = request.body.patientProfile.payments;
                } else if (request.body.patientProfile.country){
                    patientProfile.country = request.body.patientProfile.country;
                } else if (request.body.patientProfile.province){
                    patientProfile.province = request.body.patientProfile.province;
                } else if (request.body.patientProfile.city){
                    patientProfile.city = request.body.patientProfile.city;
                } else if (request.body.patientProfile.gender){
                    patientProfile.gender = request.body.patientProfile.gender;
                } else if (request.body.patientProfile.appointments){
                    patientProfile.appointments = request.body.patientProfile.appointments;
                }
                patientProfile.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({patientProfile: patientProfile});
                    }
                });
            }
        });

    })
    .delete(function (req, res) {
        if (!req.params.patientProfile_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            PatientProfile.Model.findById(req.params.patientProfile_id, function (err, patientProfile) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    patientProfile.remove(function (err) {
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
