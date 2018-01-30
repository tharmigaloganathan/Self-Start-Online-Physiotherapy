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
        } else if (!assessmentTest.recommendations){
            response.json({success: false, message: "No recommendations detected."});
        } else if (!assessmentTest.form){
            response.json({success: false, message: "No form detected."});
        } else if (!assessmentTest.testResults){
            response.json({success: false, message: "No testResults detected."});
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
            response.json({assessmentTest: assessmentTest});
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
<<<<<<< HEAD
        if (!request.body.assessmentTest.name){
            response.json({success: false, message: "No name detected."});
        } else if (!request.body.assessmentTest.description){
            response.json({success: false, message: "No description detected."});
        } else if (!request.body.assessmentTest.authorName){
            response.json({success: false, message: "No authorName detected."});
        } else if (!request.body.assessmentTest.recommendations){
            response.json({success: false, message: "No recommendations detected."});
        } else if (!request.body.assessmentTest.form){
            response.json({success: false, message: "No form detected."});
        } else if (!request.body.assessmentTest.testResults){
            response.json({success: false, message: "No testResults detected."});
        } else if (!request.body.assessmentTest.rehabilitationPlan){
            response.json({success: false, message: "No rehabilitationPlan detected."});
        } else {
            AssessmentTests.Model.findById(request.params.assessmentTest_id, function (error, assessmentTest) {
                if (error) {
                    response.send({error: error});
                }
                else {
=======
        AssessmentTests.Model.findById(request.params.assessmentTest_id, function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.assessmentTest.name){
>>>>>>> 8f26f2eeeb8c2af3403f42fb2deef5fe94b7bcca
                    assessmentTest.name = request.body.assessmentTest.name;
                } else if (request.body.assessmentTest.description){
                    assessmentTest.description = request.body.assessmentTest.description;
                } else if (request.body.assessmentTest.authorName){
                    assessmentTest.authorName = request.body.assessmentTest.authorName;
<<<<<<< HEAD
                    assessmentTest.recommendations = request.body.assessmentTest.recommendations;
                    assessmentTest.form = request.body.assessmentTest.form;
                    assessmentTest.testResults = request.body.assessmentTest.testResults;
=======
                } else if (request.body.assessmentTest.recommendation){
                    assessmentTest.recommendation = request.body.assessmentTest.recommendation;
                } else if (request.body.assessmentTest.form){
                    assessmentTest.form = request.body.assessmentTest.form;
                } else if (request.body.assessmentTest.testResult){
                    assessmentTest.testResult = request.body.assessmentTest.testResult;
                } else if (request.body.assessmentTest.rehabilitationPlan){
>>>>>>> 8f26f2eeeb8c2af3403f42fb2deef5fe94b7bcca
                    assessmentTest.rehabilitationPlan = request.body.assessmentTest.rehabilitationPlan;
                }
                assessmentTest.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({assessmentTest: assessmentTest});
                    }
                });
            }
        });
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
    });

module.exports = router;
