var express = require('express');
var router = express.Router();
var Physiotherapists = require('../models/Physiotherapist');

router.route('/')
    .post(function (request, response) {
        var physiotherapist = new Physiotherapists.Model(request.body.physiotherapist);
        if (!physiotherapist.familyName){
            response.json({success: false, message: "No familyName detected."});
        } else if (!physiotherapist.givenName){
            response.json({success: false, message: "No givenName detected."});
        } else if (!physiotherapist.email){
            response.json({success: false, message: "No email detected."});
        } else if (!physiotherapist.dateHired){
            response.json({success: false, message: "No dateHired detected."});
        } else if (!physiotherapist.dateFinished){
            response.json({success: false, message: "No dateFinished detected."});
        } else if (!physiotherapist.treatments){
            response.json({success: false, message: "No treatments detected."});
        } else if (!physiotherapist.userAccount){
            response.json({success: false, message: "No userAccount detected."});
        } else {
            physiotherapist.save(function (error) {
                if (error) response.send(error);
                response.json({physiotherapist: physiotherapist});
            });
        }
    })
	.get(function (request, response) {
        Physiotherapists.Model.find(function (error, physiotherapists) {
            if (error) response.send(error);
            response.json({physiotherapists: physiotherapists});
        });
    });

router.route('/physiotherapist_id')
	.get(function (request, response) {
		Physiotherapists.Model.findById(request.params.physiotherapist_id, function (error, physiotherapist) {
			if (error) {
				response.send({error: error});
			}
			else {
				response.json({physiotherapist: physiotherapist});
			}
		});
	})
	.put(function (request, response) {
        Physiotherapists.Model.findById(request.params.physiotherapist_id, function (error, physiotherapist) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.physiotherapist.familyName){
                    physiotherapist.familyName = request.body.physiotherapist.familyName;
                } else if (request.body.physiotherapist.givenName){
                    physiotherapist.givenName = request.body.physiotherapist.givenName;
                } else if (request.body.physiotherapist.email){
                    physiotherapist.email = request.body.physiotherapist.email;
                } else if (request.body.physiotherapist.dateHired){
                    physiotherapist.dateHired = request.body.physiotherapist.dateHired;
                } else if (request.body.physiotherapist.dateFinished){
                    physiotherapist.dateFinished = request.body.physiotherapist.dateFinished;
                } else if (request.body.physiotherapist.treatments){
                    physiotherapist.treatments = request.body.physiotherapist.treatments;
                } else if (request.body.physiotherapist.userAccount){
                    physiotherapist.userAccount = request.body.physiotherapist.userAccount;
                }
                physiotherapist.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({physiotherapist: physiotherapist});
                    }
                });
            }
        });
    })
	.delete(function (req, res) {
        if (!req.params.physiotherapist_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Physiotherapists.Model.findById(req.params.physiotherapist_id, function (err, physiotherapist) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    physiotherapist.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'physiotherapist deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
