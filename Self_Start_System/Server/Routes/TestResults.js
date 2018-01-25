var express = require('express');
var router = express.Router();
var TestResults = require('../models/TestResult');

router.route('/')
    .post(function (request, response) {
        var testResult = new TestResults.Model(request.body.testResult);
        if (!testResult.question){
            response.json({success: false, message: "No question detected."});
        } else if (!testResult.answer){
            response.json({success: false, message: "No answer detected."});
        } else if (!testResult.assessmentTest){
            response.json({success: false, message: "No assessmentTest detected."});
        } else {
            testResult.save(function (error) {
                if (error) response.send(error);
                response.json({testResult: testResult});
            });
        }
    })
    .get(function (request, response) {
        TestResults.Model.find(function (error, testResult) {
            if (error) response.send(error);
            response.json({testResult: testResults});
        });
    });

router.route('/:testResult_id')
    .get(function (request, response) {
        TestResults.Model.findById(request.params.testResult_id, function (error, testResult) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({testResult: testResult});
            }
        });
    })
    .put(function (request, response) {
        if (!request.body.testResult.question){
            response.json({success: false, message: "No question detected."});
        } else if (!request.body.testResult.answer){
            response.json({success: false, message: "No answer detected."});
        } else if (!request.body.testResult.assessmentTest){
            response.json({success: false, message: "No assessmentTest detected."});
        } else {
            TestResults.Model.findById(request.params.testResult_id, function (error, testResult) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    testResult.question = request.body.testResult.question;
                    testResult.answer = request.body.testResult.answer;
                    testResult.assessmentTest = request.body.testResult.assessmentTest;
                    testResult.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        } else {
                            response.json({testResult: testResult});
                        }
                    });
                }
            });
        }
    })
    .delete(function (req, res) {
        if (!req.params.testResult_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            TestResults.Model.findById({req.params.testResult_id}, function (err, testResult) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    testResult.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'testResult deleted!'});
                        }
                    })
                }
            })
        }
    })

module.exports = router;
