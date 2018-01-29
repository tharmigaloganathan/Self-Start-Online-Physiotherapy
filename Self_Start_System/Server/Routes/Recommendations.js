var express = require('express');
var router = express.Router();
var Recommendations = require('../models/Recommendation');

router.route('/')
	.post(function (request, response) {
		var recommendation = new Recommendations.Model(request.body.recommendation);
		if (!recommendation.timeStamp) {
			response.json({success: false, message: "No timeStamp detected."});
		} else if (!recommendation.decision) {
				response.json({success: false, message: "No decision detected."});
		} else if (!recommendation.treatment) {
				response.json({success: false, message: "No treatment detected."});
		} else if (!recommendation.assessmentTest) {
				response.json({success: false, message: "No assessmentTest detected."});
		} else {
			recommendation.save(function(error) {
				if(error) response.send(error);
				response.json({recommendation: recommendation});
			});
		}
	})
	.get(function (request, response) {
        Recommendations.Model.find(function (error, recommendations) {
            if (error) response.send(error);
            response.json({recommendation: recommendation});
        });
    });

router.route('/:recommendation_id')
	.get(function (request, response) {
		Recommendations.Model.findById(request.params.recommendation_id, function (error, recommendation) {
			if (error) {
				response.send({error: error});
			}
			else {
				response.json({recommendation: recommendation});
			}
		});
	})
	.put(function (request, response) {
		Recommendations.Model.findById(request.params.recommendation_id, function (error, recommendation) {
			if (error) {
		   		response.send({error: error});
	   		}
			else {
				if(request.body.recommendation.timeStamp) {
					recommendation.timeStamp = request.body.recommendation.timeStamp;
				} else if (request.body.recommendation.decision) {
					recommendation.decision = request.body.recommendation.decision;
				} else if (request.body.recommendation.treatment) {
					recommendation.treatment = request.body.recommendation.treatment;
				} else if (request.body.recommendation.assessmentTest) {
					recommendation.assessmentTest = request.body.recommendation.assessmentTest;
				}
				recommendation.save(function (error) {
					if (error) {
                        response.send({error: error});
                    } else {
                        response.json({recommendation: recommendation});
                    }
				});
			}
		});
	})
	.delete(function (req, res) {
        if (!req.params.recommendation_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Recommendations.Model.findById(req.params.recommendation_id, function (err, recommendation) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    recommendation.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'recommendation deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
