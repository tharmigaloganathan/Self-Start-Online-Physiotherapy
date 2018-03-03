var express = require('express');
var router = express.Router();
var PatientProfiles = require('../Models/PatientProfile');

router.route('/')
    .post(function (request, response) {
        PatientProfiles.add(request.body).then(function(patientProfile){
            response.json({patientProfile: patientProfile});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        PatientProfiles.getAll().then(function(patientProfiles){
            response.json({patientProfile: patientProfiles});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:patientprofile_id')
    .get(function (request, response) {
        if (!request.params.patientprofile_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        PatientProfiles.getOne(request.params.patientprofile_id).then(function(patientProfile){
            response.json({patientProfile: patientProfile});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.patientprofile_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        PatientProfiles.update(request.params.patientprofile_id, request.body).then(function(patientProfile){
            response.json({patientProfile: patientProfile});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.patientprofile_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        PatientProfiles.deleteOne(request.params.patientprofile_id).then(function(patientProfile){
            response.json({success: true, message: 'patientProfile deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
