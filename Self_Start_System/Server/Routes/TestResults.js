var express = require('express');
var router = express.Router();
var TestResults = require('../Models/TestResult');

router.route('/')
    .post(function (request, response) {
        TestResults.add(request.body).then(function(testResult){
            response.json({testResult: testResult});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        TestResults.getAll().then(function(testResults){
            response.json({testResult: testResults});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        TestResults.getOne(request.params.object_id).then(function(testResult){
            response.json({testResult: testResult});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        TestResults.update(request.params.object_id, request.body).then(function(testResult){
            response.json({testResult: testResult});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        TestResults.deleteOne(request.params.object_id).then(function(testResult){
            response.json({success: true, message: 'testResult deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/assessmentTest/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        TestResults.getByAssessmentTestID(request.params.object_id).then(function(testResult){
            response.json({testResult: testResult});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
