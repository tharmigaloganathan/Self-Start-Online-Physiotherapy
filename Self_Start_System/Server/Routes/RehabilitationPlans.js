var express = require('express');
var router = express.Router();
var RehabilitationPlans = require('../models/RehabilitationPlan');

router.route('/')
    .post(function (request, response) {
        var rehabilitationPlan = new RehabilitationPlans.Model(request.body.rehabilitationPlan);
        if (!rehabilitationPlan.name) {
            response.json({success: false, message: "No name detected."});
        } else if (!rehabilitationPlan.description) {
            response.json({success: false, message: "No description detected."});
        } else if (!rehabilitationPlan.authorName) {
            response.json({success: false, message: "No authorName detected."});
        } else if (!rehabilitationPlan.goal) {
            response.json({success: false, message: "No goal detected."});
        } else if (!rehabilitationPlan.timeFrameToComplete) {
            response.json({success: false, message: "No timeFrameToComplete detected."});
        } else {
            rehabilitationPlan.save(function(error) {
                if(error) response.send(error);
                response.json({rehabilitationPlan: rehabilitationPlan});
            });
        }
    })
    .get(function (request, response) {
        RehabilitationPlans.Model.find(function (error, rehabilitationPlans) {
            if (error) response.send(error);
            response.json({rehabilitationPlan: rehabilitationPlans});
        });
    });

router.route('/:rehabilitationPlan_id')
    .get(function (request, response) {
        RehabilitationPlans.Model.findById(request.params.rehabilitationPlan_id, function (error, rehabilitationPlan) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({rehabilitationPlan: rehabilitationPlan});
            }
        });
    })
    .put(function (request, response) {
        RehabilitationPlans.Model.findById(request.params.rehabilitationPlan_id, function (error, rehabilitationPlan) {
            if (error) {
                response.send({error: error});
            }
            else {
                if(request.body.name) {
                    rehabilitationPlan.name = request.body.name;
                } else if (request.body.description) {
                    rehabilitationPlan.description = request.body.description;
                } else if (request.body.authorName) {
                    rehabilitationPlan.authorName = request.body.authorName;
                } else if (request.body.goal) {
                    rehabilitationPlan.goal = request.body.goal;
                } else if (request.body.timeFrameToComplete) {
                    rehabilitationPlan.timeFrameToComplete = request.body.timeFrameToComplete;
                } else if (request.body.exercises) {
                    rehabilitationPlan.exercises = request.body.exercises;
                } else if (request.body.assessmentTests) {
                    rehabilitationPlan.assessmentTests = request.body.assessmentTests;
                } else if (request.body.treatments) {
                    rehabilitationPlan.treatments = request.body.treatments;
                }
                rehabilitationPlan.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({rehabilitationPlan: rehabilitationPlan});
                    }
                });
            }
        });
    })
    .delete(function (req, res) {
        if (!req.params.rehabilitationPlan_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            RehabilitationPlans.Model.findById(req.params.rehabilitationPlan_id, function (err, rehabilitationPlan) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    rehabilitationPlan.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'rehabilitationPlan deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
