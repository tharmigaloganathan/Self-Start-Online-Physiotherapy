var express = require('express');
var router = express.Router();
var RehabilitationPlans = require('../Models/RehabilitationPlan');

router.route('/')
    .post(function (request, response) {
        RehabilitationPlans.add(request.body).then(function(rehabilitationPlan){
            response.json({rehabilitationPlan: rehabilitationPlan});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        RehabilitationPlans.getAll().then(function(rehabilitationPlans){
            response.json({rehabilitationPlan: rehabilitationPlans});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        RehabilitationPlans.getOne(request.params.object_id).then(function(rehabilitationPlan){
            response.json({rehabilitationPlan: rehabilitationPlan});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        RehabilitationPlans.update(request.params.object_id, request.body).then(function(rehabilitationPlan){
            response.json({rehabilitationPlan: rehabilitationPlan});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        RehabilitationPlans.deleteOne(request.params.object_id).then(function(rehabilitationPlan){
            response.json({success: true, message: 'rehabilitationPlan deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
