var express = require('express');
var router = express.Router();
var AssessmentTests = require('../Models/AssessmentTest');

router.route('/')
    .post(function (request, response) {
        AssessmentTests.add(request.body).then(function(assessmentTest){
            response.json({assessmentTest: assessmentTest});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        AssessmentTests.getAll().then(function(assessmentTests){
            response.json({assessmentTest: assessmentTests});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:assessmentTest_id')
    .get(function (request, response) {
        if (!request.params.assessmentTest_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        AssessmentTests.getOne(request.params.assessmentTest_id).then(function(assessmentTest){
            response.json({assessmentTest: assessmentTest});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.assessmentTest_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        AssessmentTests.update(request.params.assessmentTest_id, request.body).then(function(assessmentTest){
            response.json({assessmentTest: assessmentTest});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.assessmentTest_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        AssessmentTests.deleteOne(request.params.assessmentTest_id).then(function(assessmentTest){
            response.json({success: true, message: 'assessmentTest deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
