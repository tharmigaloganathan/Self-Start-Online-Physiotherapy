var express = require('express');
var router = express.Router();
var Treatments = require('../models/Treatment');

router.route('/')
    .post(function (request, response) {
        var treatment = new Treatments.Model(request.body.treatment);
        if (!treatment.dateAssign){
            response.json({success: false, message: "No dateAssign detected."});
        } else if (!treatment.physiotherapist){
            response.json({success: false, message: "No physiotherapist detected."});
        } else if (!treatment.patientProfile){
            response.json({success: false, message: "No patientProfile detected."});
        } else if (!treatment.rehabilitationPlan){
            response.json({success: false, message: "No rehabilitationPlan detected."});
        } else if (!treatment.recommendations){
            response.json({success: false, message: "No recommendations detected."});
        } else {
            treatment.save(function (error) {
                if (error) response.send(error);
                response.json({treatment: treatment});
            });
        }
    })
	.get(function (request, response) {
        Treatments.Model.find(function (error, treatments) {
            if (error) response.send(error);
            response.json({treatments: treatments});
        });
    });

router.route('/:treatment_id')
	.get(function (request, response) {
		Treatments.Model.findById(request.params.treatment_id, function (error, treatment) {
			if (error) {
				response.send({error: error});
			}
			else {
				response.json({treatment: treatment});
			}
		});
	})
	.put(function (request, response) {
        Treatments.Model.findById(request.params.treatment_id, function (error, treatment) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.treatment.dateAssign){
                    treatment.dateAssign = request.body.treatment.dateAssign;
                } else if (request.body.treatment.physiotherapist){
                    treatment.physiotherapist = request.body.treatment.physiotherapist;
                } else if (request.body.treatment.patientProfile){
                    treatment.patientProfile = request.body.treatment.patientProfile;
                } else if (request.body.treatment.rehabilitationPlan){
                    treatment.rehabilitationPlan = request.body.treatment.rehabilitationPlan;
                } else if (request.body.treatment.recommendations){
                    treatment.recommendations = request.body.treatment.recommendations;
                }
                treatment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({treatment: treatment});
                    }
                });
            }
        });
    })
	.delete(function (req, res) {
        if (!req.params.treatment_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Treatments.Model.findById(req.params.treatment_id, function (err, treatment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    treatment.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'treatment deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
