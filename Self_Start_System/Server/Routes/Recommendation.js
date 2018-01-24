const Recommendation = require('../Models/Recommendation');

module.exports = function (router){

    //get specific recommendation
    router.get('/recommendation/:recommendationID', function (req, res) {
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
                        message: ('Success! Retrieved recoomendation with id ' + recomendationID),
                        recommendation: recommendation
                    })
                }
            })
        }
    })

    //get all recommendations
    router.get('/recommendation', function (req, res) {
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
    })

    //post a recommendation
    router.post('/recommendation', function (req, res) {
        if (!req.body.recommendationID){
            res.json({success: false, message: "No recommendationID detected."});
        } else if (!req.body.timeStamp){
            res.json({success: false, message: "No time stamp detected."});
        } else if (!req.body.decision) {
            res.json({success: false, message: "No decision detected."});
        } else {

            //create a new recommendation instance to be saved
            var recommendation = new Recommendation({
                recommendationID: req.body.recommendationID,
                timeStamp: req.body.timeStamp,
                decision: req.body.decision
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
    })

    //change decision and time stamp of recommendation
    router.put('/recommendation/:recommendationID', function (req, res) {
        if (!(req.params.recommendationID)) {
            res.json({success: false, message: 'id was not provided'});
        } else if (!(req.body.decision)) {
            res.json({success: false, message: 'no new decision detected'});
        } else {
                Recommendation.findOne({recommendationID: req.params.recommendationID}, function (err, recommendation) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //update to new decision and time stamp
                    recommendation.timeStamp = req.body.timeStamp;
                    recommendation.decision = req.body.decision;

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
    })

    //delete recommendation
    router.delete('/recommendation/:recommendationID', function (req, res) {
        if (!(req.params.recommendationID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Recommendation.findOne({recommendationID: req.params.recommendationID}, function (err, recommendation) {
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
    })
}
