var express = require('express');
var router = express.Router();
var Recommendations = require('../Models/Recommendation');

router.route('/')
    .post(function (request, response) {
        Recommendations.add(request.body.recommendation).then(function(recommendation){
            response.json({recommendation: recommendation});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Recommendations.getAll().then(function(recommendations){
            response.json({recommendation: recommendations});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Recommendations.getOne(request.params.object_id).then(function(recommendation){
            response.json({recommendation: recommendation});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Recommendations.update(request.params.object_id, request.body.recommendation).then(function(recommendation){
            response.json({recommendation: recommendation});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Recommendations.deleteOne(request.params.object_id).then(function(recommendation){
            res.json({success: true, message: 'recommendation deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
