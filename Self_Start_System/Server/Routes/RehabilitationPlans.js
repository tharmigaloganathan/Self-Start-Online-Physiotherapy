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
                if(request.body.rehabilitationPlan.name) {
                    rehabilitationPlan.name = request.body.rehabilitationPlan.name;
                } else if (request.body.rehabilitationPlan.description) {
                    rehabilitationPlan.description = request.body.rehabilitationPlan.description;
                } else if (request.body.rehabilitationPlan.authorName) {
                    rehabilitationPlan.authorName = request.body.rehabilitationPlan.authorName;
                } else if (request.body.rehabilitationPlan.goal) {
                    rehabilitationPlan.goal = request.body.rehabilitationPlan.goal;
                } else if (request.body.rehabilitationPlan.timeFrameToComplete) {
                    rehabilitationPlan.timeFrameToComplete = request.body.rehabilitationPlan.timeFrameToComplete;
                } else if (request.body.rehabilitationPlan.exercises) {
                    rehabilitationPlan.exercises = request.body.rehabilitationPlan.exercises;
                } else if (request.body.rehabilitationPlan.assessmentTests) {
                    rehabilitationPlan.assessmentTests = request.body.rehabilitationPlan.assessmentTests;
                } else if (request.body.rehabilitationPlan.treatments) {
                    rehabilitationPlan.treatments = request.body.rehabilitationPlan.treatments;
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
