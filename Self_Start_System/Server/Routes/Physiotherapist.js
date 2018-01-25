const Physiotherapist = require('../Models/Physiotherapist');

module.exports = function (router){

    //get specific physiotherapist
    router.get('/physiotherapist/:physiotherapistID', function (req, res) {
        if (!(req.params.physiotherapistID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Physiotherapist.findOne({physiotherapistID: req.params.physiotherapistID}, function (err, physiotherapist) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return physiotherapist object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved physiotherapist with id ' + physiotherapistID),
                        physiotherapist: physiotherapist
                    })
                }
            })
        }
    })

    //get all physiotherapists
    router.get('/physiotherapist', function (req, res) {
        Physiotherapist.find({}, function (err, physiotherapists) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all physiotherapists
                res.json({
                    success: true,
                    message: 'Success! Retrieved all physiotherapists',
                    physiotherapists: physiotherapists
                })
            }
        })
    })

    //post a physiotherapist
    router.post('/physiotherapist', function (req, res) {
        if (!req.body.physiotherapistID){
            res.json({success: false, message: "No physiotherapistID detected."});
        } else if (!req.body.familyName){
            res.json({success: false, message: "No familyName detected."});
        } else if (!req.body.givenName){
            res.json({success: false, message: "No givenName detected."});
        } else if (!req.body.email){
            res.json({success: false, message: "No email detected."});
        } else if (!req.body.dateHired){
            res.json({success: false, message: "No dateHired detected."});
        } else if (!req.body.treatments){
            res.json({success: false, message: "No treatments detected."});
        } else {
            //create a new physiotherapist instance to be saved
            var physiotherapist = new Physiotherapist({
                physiotherapistID: req.body.physiotherapistID,
                familyName: req.body.familyName,
                givenName: req.body.givenName,
                email: req.body.email,
                dateHired: req.body.dateHired,
                dateFinished: null, //not known yet at time of registration
                treatments: req.body.treatments,
                userAccount: req.body.userAccount

            });

            //save it
            physiotherapist.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "physiotherapist saved!"});
                }
            })
        }
    })

    //change info for physiotherapist
    router.put('/physiotherapist/:physiotherapistID', function (req, res) {
        if (!(req.params.physiotherapistID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Physiotherapist.findOne({physiotherapistID: req.params.physiotherapistID}, function (err, physiotherapist) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    
                    if (req.body.familyName) {
                        //update with new familyName
                        physiotherapist.familyName = req.body.familyName;
                    }

                    if (req.body.givenName) {
                        //update with new givenName
                        physiotherapist.givenName = req.body.givenName;
                    }

                    if (req.body.email) {
                        //update with new email
                        physiotherapist.email = req.body.email;
                    }

                    if (req.body.dateHired) {
                        //update with new dateHired
                        physiotherapist.dateHired = req.body.dateHired;
                    }
                    
                    if (req.body.dateFinished) {
                        //update with new dateFinished
                        physiotherapist.dateFinished = req.body.dateFinished;
                    }

                    if (req.body.treatments) {
                        //update with new treatments
                        physiotherapist.treatments = req.body.treatments;
                    }

                    if (req.body.userAccount) {
                        //update with new treatments
                        physiotherapist.userAccount = req.body.userAccount;
                    }

                    //save changes
                    physiotherapist.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to physiotherapist saved!'});
                        }
                    })
                }
            })
        }
    })

    //delete physiotherapist
    router.delete('/physiotherapist/:physiotherapistID', function (req, res) {
        if (!(req.params.physiotherapistID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Physiotherapist.findOne({physiotherapistID: req.params.physiotherapistID}, function (err, physiotherapist) {
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
    })

    return router;
}
