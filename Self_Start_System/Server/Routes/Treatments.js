var express = require('express');
var router = express.Router();
var Treatments = require('../Models/Treatment');

router.route('/')
    .post(function (request, response) {
        Treatments.add(request.body).then(function(treatment){
            response.json({treatment: treatment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Treatments.getAll().then(function(treatments){
            response.json({treatment: treatments});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Treatments.getOne(request.params.object_id).then(function(treatment){
            response.json({treatment: treatment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Treatments.update(request.params.object_id, request.body).then(function(treatment){
            response.json({treatment: treatment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Treatments.deleteOne(request.params.object_id).then(function(treatment){
            response.json({success: true, message: 'treatment deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/by-physio/:physio_id')
    .get(function (request, response) {
        if (!request.params.physio_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Treatments.getAllByPhysio(request.params.physio_id).then(function(treatments){
            patients=[];
            treatments.forEach(function(treatment){
                if(!patients.includes(treatment.patientProfile)){
                    patients.push(treatment.patientProfile)
                }
            });
            response.json({patientList: patients});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
