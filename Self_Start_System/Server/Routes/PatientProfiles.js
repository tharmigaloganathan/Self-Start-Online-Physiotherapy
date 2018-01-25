const PatientProfile = require('../Models/PatientProfile');

module.exports = function (router){

    //get specific PatientProfile
    router.get('/patientProfile/:patientProfileID', function (req, res) {
        if (!(req.params.patientProfileID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            PatientProfile.findOne({patientProfileID: req.params.patientProfileID}, function (err, patientProfile) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return patientProfile object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved patientProfile with id ' + req.params.patientProfileID),
                        patientProfile: patientProfile
                    })
                }
            })
        }
    });

    //get all patientProfiles
    router.get('/patientProfile', function (req, res) {
        PatientProfile.find({}, function (err, patientProfiles) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all patientProfiles
                res.json({
                    success: true,
                    message: 'Success! Retrieved all patientProfiles',
                    patientProfiles: patientProfiles
                })
            }
        })
    });

    // post a patientProfile
    router.post('/patientProfile', function (req, res) {
        if (!req.body.patientProfileID){
            res.json({success: false, message: "No patientProfileID detected."});
        } else if (!req.body.DOB){
            res.json({success: false, message: "No DOB detected."});
        } else if (!req.body.postalCode) {
            res.json({success: false, message: "No postalCode detected."});
        } else if (!req.body.phone) {
            res.json({success: false, message: "No phone number detected."});
        } else if (!req.body.martialStatus) {
            res.json({success: false, message: "No martialStatus detected."});
        } else if (!req.body.healthCardNumber) {
            res.json({success: false, message: "No healthCardNumber detected."});
        } else if (!req.body.occupation) {
            res.json({success: false, message: "No occupation detected."});
        } else if (!req.body.others) {
            res.json({success: false, message: "No others field detected."});
        } else {

            //create a new patientProfile instance to be saved
            var patientProfile = new PatientProfile({
                patientProfileID: req.body.patientProfileID,
                DOB: req.body.DOB,
                postalCode: req.body.postalCode,
                phone: req.body.phone,
                martialStatus: req.body.martialStatus,
                healthCardNumber: req.body.healthCardNumber,
                occupation: req.body.occupation,
                others: req.body.others,
            });

            //save it
            patientProfile.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "PatientProfile saved!"});
                }
            })
        }
    });

    //change decision and time stamp of patientProfile
    router.put('/patientProfile/:patientProfileID', function (req, res) {
        if (!req.body.patientProfileID){
            res.json({success: false, message: "No patientProfileID detected."});
        } else if (!req.body.DOB){
            res.json({success: false, message: "No DOB detected."});
        } else if (!req.body.postalCode) {
            res.json({success: false, message: "No postalCode detected."});
        } else if (!req.body.phone) {
            res.json({success: false, message: "No phone number detected."});
        } else if (!req.body.martialStatus) {
            res.json({success: false, message: "No martialStatus detected."});
        } else if (!req.body.healthCardNumber) {
            res.json({success: false, message: "No healthCardNumber detected."});
        } else if (!req.body.occupation) {
            res.json({success: false, message: "No occupation detected."});
        } else if (!req.body.others) {
            res.json({success: false, message: "No others field detected."});
        } else {
            PatientProfile.findOne({patientProfileID: req.params.patientProfileID}, function (err, patientProfile) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //update to new patientProfile
                    patientProfile.DOB = req.body.DOB;
                    patientProfile.postalCode = req.body.postalCode;
                    patientProfile.phone = req.body.phone;
                    patientProfile.martialStatus = req.body.martialStatus;
                    patientProfile.healthCardNumber = req.body.healthCardNumber;
                    patientProfile.occupation = req.body.occupation;
                    patientProfile.others = req.body.others;

                    //save changes
                    patientProfile.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to patientProfile saved!'});
                        }
                    })
                }
            })
        }
    });

    //delete patientProfile
    router.delete('/patientProfile/:patientProfileID', function (req, res) {
        if (!(req.params.patientProfileID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            PatientProfile.findOne({patientProfileID: req.params.patientProfileID}, function (err, patientProfile) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    patientProfile.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'patientProfile deleted!'});
                        }
                    })
                }
            })
        }
    })

    return router;
};
