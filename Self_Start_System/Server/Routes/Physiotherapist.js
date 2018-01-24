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
        } else if (!req.body.dateHired){
            res.json({success: false, message: "No dateHired detected."});
        }  else {

            //create a new physiotherapist instance to be saved
            var physiotherapist = new Physiotherapist({
                physiotherapistID: req.body.physiotherapistID,
                dateHired: req.body.dateHired,
                dateFinished: null //not known yet at time of registration
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

    //change dateFinished for physiotherapist
    router.put('/physiotherapist/:physiotherapistID', function (req, res) {
        if (!(req.params.physiotherapistID)) {
            res.json({success: false, message: 'id was not provided'});
        } else if (!(req.body.dateFinished)) {
            res.json({success: false, message: 'no new dateFinished detected'});
        } else {
            Physiotherapist.findOne({physiotherapistID: req.params.physiotherapistID}, function (err, physiotherapist) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //update with new dateFinished
                    physiotherapist.dateFinished = req.body.dateFinished;

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
}
