const RehabilitationPlans = require('../Models/RehabilitationPlan');

module.exports = function (router){

    //get specific rehabilitationPlans
    router.get('/rehabilitationPlans/:rehabilitationPlansID', function (req, res) {
        if (!(req.params.rehabilitationPlansID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            RehabilitationPlans.findOne({rehabilitationPlansID: req.params.rehabilitationPlansID}, function (err, rehabilitationPlans) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return rehabilitationPlans object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved rehabilitationPlans with id ' + rehabilitationPlansID),
                        rehabilitationPlans: rehabilitationPlans
                    })
                }
            })
        }
    })

    //get all rehabilitationPlanss
    router.get('/rehabilitationPlans', function (req, res) {
        RehabilitationPlans.find({}, function (err, rehabilitationPlanss) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all rehabilitationPlanss
                res.json({
                    success: true,
                    message: 'Success! Retrieved all rehabilitationPlanss',
                    rehabilitationPlanss: rehabilitationPlanss
                })
            }
        })
    })

    //post a rehabilitationPlans
    router.post('/rehabilitationPlans', function (req, res) {
        if (!req.body.rehabilitationPlansID){
            res.json({success: false, message: "No rehabilitationPlansID detected."});
        } else if (!req.body.dateAssign){
            res.json({success: false, message: "No dateAssign detected."});
        }  else {

            //create a new rehabilitationPlans instance to be saved
            var rehabilitationPlans = new RehabilitationPlans({
                rehabilitationPlansID: req.body.rehabilitationPlansID,
                name: req.body.name,
                description: req.body.description,
                authorName: req.body.authorName,
                goal: req.body.goal,
                timeFrameToComplete: req.body.timeFrameToComplete,
                exercises: req.body.exercises,
                assessmentTests: req.body.assessmentTests,
                treatments: req.body.treatments
            });

            //save it
            rehabilitationPlans.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "rehabilitationPlans saved!"});
                }
            })
        }
    })

    //update rehabilitationPlans
    router.put('/rehabilitationPlans/:rehabilitationPlansID', function (req, res) {
        if (!(req.params.rehabilitationPlansID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            RehabilitationPlans.findOne({rehabilitationPlansID: req.params.rehabilitationPlansID}, function (err, rehabilitationPlans) {
                if (err) {
                    res.json({success: false, message: err});
                } else {

                    if (req.body.name) {
                        //update with new name
                        rehabilitationPlans.name= req.body.name;
                    }

                    if (req.body.description) {
                        //update with new description
                        rehabilitationPlans.description= req.body.description;
                    }

                    if (req.body.authorName) {
                        //update with new authorName
                        rehabilitationPlans.authorName = req.body.authorName;
                    }

                    if (req.body.goal) {
                        //update with new goal
                        rehabilitationPlans.goal= req.body.goal;
                    }

                    if (req.body.timeFrameToComplete) {
                        //update with new timeFrameToComplete
                        rehabilitationPlans.timeFrameToComplete= req.body.timeFrameToComplete;
                    }

                    if (req.body.exercises) {
                        //update with new exercises
                        rehabilitationPlans.exercises= req.body.exercises;
                    }

                    if (req.body.assessmentTests) {
                        //update with new assessmentTests
                        rehabilitationPlans.assessmentTests= req.body.assessmentTests;
                    }

                    if (req.body.treatments) {
                        //update with new treatments
                        rehabilitationPlans.treatments= req.body.treatments;
                    }



                    //save changes
                    rehabilitationPlans.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to rehabilitationPlans saved!'});
                        }
                    })
                }
            })
        }
    })

    //delete rehabilitationPlans
    router.delete('/rehabilitationPlans/:rehabilitationPlansID', function (req, res) {
        if (!(req.params.rehabilitationPlansID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            RehabilitationPlans.findOne({rehabilitationPlansID: req.params.rehabilitationPlansID}, function (err, rehabilitationPlans) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    rehabilitationPlans.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'rehabilitationPlans deleted!'});
                        }
                    })
                }
            })
        }
    })

    return router;
}
