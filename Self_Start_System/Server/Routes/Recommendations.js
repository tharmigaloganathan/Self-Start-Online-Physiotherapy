const Recommendation = require('../Models/Recommendation');

module.exports = function (router){

    //get specific recommendation
    router.get('/:recommendationID', function (req, res) {
        if (!(req.params.recommendationID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Recommendation.findOne({recommendationID: req.params.recommendationID}, function (err, recommendation) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return recommendation object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved recommendation with id ' + req.params.recommendationID),
                        recommendation: recommendation
                    })
                }
            })
        }
    });

    //get all recommendations
    router.get('/', function (req, res) {
        Recommendation.find({}, function (err, recommendations) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all recommendations
                res.json({
                    success: true,
                    message: 'Success! Retrieved all recommendations',
                    recommendations: recommendations
                })
            }
        })
    });

    //post a recommendation
    router.post('/', function (req, res) {
        if (!req.body.timeStamp){
            res.json({success: false, message: "No time stamp detected."});
        } else if (!req.body.decision) {
            res.json({success: false, message: "No decision detected."});
        } else if (!req.body.treatment) {
            res.json({success: false, message: "No treatment detected."});
        } else if (!req.body.assessmentTest) {
            res.json({success: false, message: "No assessment test detected"});
        } else {

            //create a new recommendation instance to be saved
            var recommendation = new Recommendation({
                timeStamp: req.body.timeStamp,
                decision: req.body.decision,
                treatment: req.body.treatment,
                assessmentTest: req.body.assessmentTest
            });

            //save it
            recommendation.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "Recommendation saved!"});
                }
            })
        }
    });

    //change decision and time stamp of recommendation
    router.put('/:recommendationID', function (req, res) {
        if (!(req.params.recommendationID)) {
            res.json({success: false, message: 'id was not provided'});
        }  else {
                Recommendation.findById(req.params.recommendationID, function (err, recommendation) {
                if (err) {
                    res.json({success: false, message: err});
                } else {

                    if (req.body.timeStamp) {
                        //update with new timeStamp
                        recommendation.timeStamp = req.body.timeStamp;
                    }

                    if (req.body.decision) {
                        //update with new decision
                        recommendation.decision = req.body.decision;
                    }

                    if (req.body.treatment) {
                        //update with new treatment
                        recommendation.treatment = req.body.treatment;
                    }

                    if(req.body.assessmentTest) {
                        //update with new AssessmentTest
                        recommendation.assessmentTest = req.body.treatment;
                    }

                    //save changes
                    recommendation.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to recommendation saved!'});
                        }
                    })
                }
            })
        }
    });

    //delete recommendation
    router.delete('/:recommendationID', function (req, res) {
        if (!(req.params.recommendationID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Recommendation.findById(req.params.recommendationID, function (err, recommendation) {
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

    return router;
};
