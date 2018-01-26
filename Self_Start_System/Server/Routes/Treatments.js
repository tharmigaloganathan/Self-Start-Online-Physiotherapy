const Treatments = require('../Models/Treatment');

module.exports = function (router){

    //get specific treatment
    router.get('/:treatmentID', function (req, res) {
        if (!(req.params.treatmentID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Treatments.findOne({treatmentID: req.params.treatmentID}, function (err, treatment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return treatment object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved treatment with id ' + req.params.treatmentID),
                        treatment: treatment
                    })
                }
            })
        }
    });

    //get all treatments
    router.get('/', function (req, res) {
        Treatments.find({}, function (err, treatments) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all treatments
                res.json({
                    success: true,
                    message: 'Success! Retrieved all treatments',
                    treatments: treatments
                })
            }
        })
    });

    //post a treatment
    router.post('/', function (req, res) {
        if (!req.body.dateAssign){
            res.json({success: false, message: "No dateAssign detected."});
        } else if (!req.body.physiotherapist) {
            res.json({success: false, message: "No physiotherapist detected."});
        } else if (!req.body.patientProfile) {
            res.json({success: false, message: "No patientProfile detected."});
        } else if (!req.body.rehabilitationPlan) {
            res.json({success: false, message: "No rehabilitationPlan detected."});
        } else if (!req.body.recommendations) {
            res.json({success: false, message: "No recommendations detected."});
        } else {

            //create a new treatment instance to be saved
            var treatment = new Treatments({
                dateAssign: req.body.dateAssign,
                physiotherapist: req.body.physiotherapist,
                patientProfile: req.body.patient,
                rehabilitationPlan: req.body.rehabilitationPlan,
                recommendations: req.body.recommendations
            });

            //save it
            treatment.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "treatment saved!"});
                }
            })
        }
    });

    //update treatment
    router.put('/:treatmentID', function (req, res) {
        if (!(req.params.treatmentID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Treatments.Model.findById(req.params.treatmentID, function (err, treatment) {
                if (err) {
                    res.json({success: false, message: err});
                } else {

                    if (req.body.dateAssign) {
                        //update with new dateAssign
                        treatment.dateAssign= req.body.dateAssign;
                    }

                    if (req.body.physiotherapist) {
                        //update with new physiotherapist
                        treatment.physiotherapist= req.body.physiotherapist;
                    }

                    if (req.body.patient) {
                        //update with new patient
                        treatment.patient= req.body.patient;
                    }

                    if (req.body.rehabilitationPlan) {
                        //update with new rehabilitationPlan
                        treatment.rehabilitationPlan = req.body.rehabilitationPlan;
                    }

                    if (req.body.recommendations) {
                        //update with new recommendations
                        treatment.recommendations= req.body.recommendations;
                    }

                    //save changes
                    treatment.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to treatment saved!'});
                        }
                    })
                }
            })
        }
    });

    //delete treatment
    router.delete('/:treatmentID', function (req, res) {
        if (!(req.params.treatmentID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Treatments.findOne({treatmentID: req.params.treatmentID}, function (err, treatment) {
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

    return router;
};
