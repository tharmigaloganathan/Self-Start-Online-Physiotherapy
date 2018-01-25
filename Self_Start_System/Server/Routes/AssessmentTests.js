var express = require('express');
var router = express.Router();
var AssessmentTests = require('../models/AssessmentTest');

router.route('/')
    .post(function (request, response) {
        var assessmentTest = new AssessmentTests.Model(request.body.assessmentTest);
        if (!assessmentTest.name){
            response.json({success: false, message: "No name detected."});
        } else if (!assessmentTest.description){
            response.json({success: false, message: "No description detected."});
        } else if (!assessmentTest.authorName){
            response.json({success: false, message: "No authorName detected."});
        } else if (!assessmentTest.recommendation){
            response.json({success: false, message: "No recommendation detected."});
        } else if (!assessmentTest.form){
            response.json({success: false, message: "No form detected."});
        } else if (!assessmentTest.testResult){
            response.json({success: false, message: "No testResult detected."});
        } else if (!assessmentTest.rehabilitationPlan){
            response.json({success: false, message: "No rehabilitationPlan detected."});
        } else {
            assessmentTest.save(function (error) {
                if (error) response.send(error);
                response.json({assessmentTest: assessmentTest});
            });
        }
    })
    .get(function (request, response) {
        AssessmentTests.Model.find(function (error, assessmentTest) {
            if (error) response.send(error);
            response.json({assessmentTest: assessmentTests});
        });
    });

router.route('/:assessmentTest_id')
    .get(function (request, response) {
        AssessmentTests.Model.findById(request.params.assessmentTest_id, function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({assessmentTest: assessmentTest});
            }
        });
    })
    .put(function (request, response) {
        if (!request.body.assessmentTest.name){
            response.json({success: false, message: "No name detected."});
        } else if (!request.body.assessmentTest.description){
            response.json({success: false, message: "No description detected."});
        } else if (!request.body.assessmentTest.authorName){
            response.json({success: false, message: "No authorName detected."});
        } else if (!request.body.assessmentTest.recommendation){
            response.json({success: false, message: "No recommendation detected."});
        } else if (!request.body.assessmentTest.form){
            response.json({success: false, message: "No form detected."});
        } else if (!request.body.assessmentTest.testResult){
            response.json({success: false, message: "No testResult detected."});
        } else if (!request.body.assessmentTest.rehabilitationPlan){
            response.json({success: false, message: "No rehabilitationPlan detected."});
        } else {
            AssessmentTests.Model.findById(request.params.assessmentTest_id, function (error, assessmentTest) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    assessmentTest.name = request.body.assessmentTest.name;
                    assessmentTest.description = request.body.assessmentTest.description;
                    assessmentTest.authorName = request.body.assessmentTest.authorName;
                    assessmentTest.recommendation = request.body.assessmentTest.recommendation;
                    assessmentTest.form = request.body.assessmentTest.form;
                    assessmentTest.testResult = request.body.assessmentTest.testResult;
                    assessmentTest.rehabilitationPlan = request.body.assessmentTest.rehabilitationPlan;
                    assessmentTest.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        } else {
                            response.json({assessmentTest: assessmentTest});
                        }
                    });
                }
            });
        }
    })
    .delete(function (req, res) {
        if (!req.params.assessmentTest_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            AssessmentTests.Model.findById(req.params.assessmentTest_id, function (err, assessmentTest) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    assessmentTest.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'assessmentTest deleted!'});
                        }
                    })
                }
            })
        }
    })

module.exports = router;
