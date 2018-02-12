var express = require('express');
var router = express.Router();
var Treatments = require('../Models/Treatment');

router.route('/')
    .post(function (request, response) {
        Treatments.add(request.body.treatment).then(function(treatment){
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
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Treatments.getOne(request.params.object_id).then(function(treatment){
            response.json({treatment: treatment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Treatments.update(request.params.object_id, request.body.treatment).then(function(treatment){
            response.json({treatment: treatment});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Treatments.deleteOne(request.params.object_id).then(function(treatment){
            res.json({success: true, message: 'treatment deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
