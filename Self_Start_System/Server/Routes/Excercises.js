const Exercises = require('../Models/Treatment');

module.exports = function (router){

    //get specific exercises
    router.get('/exercises/:exercisesID', function (req, res) {
        if (!(req.params.exercisesID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Exercises.findOne({exercisesID: req.params.exercisesID}, function (err, exercises) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return exercises object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved exercises with id ' + exercisesID),
                        exercises: exercises
                    })
                }
            })
        }
    })

    //get all exercisess
    router.get('/exercises', function (req, res) {
        Exercises.find({}, function (err, exercisess) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all exercisess
                res.json({
                    success: true,
                    message: 'Success! Retrieved all exercisess',
                    exercisess: exercisess
                })
            }
        })
    })

    //post a exercises
    router.post('/exercises', function (req, res) {
        if (!req.body.exercisesID){
            res.json({success: false, message: "No exercisesID detected."});
        } else if (!req.body.dateAssign){
            res.json({success: false, message: "No dateAssign detected."});
        }  else {

            //create a new exercises instance to be saved
            var exercises = new Exercises({
                exercisesID: req.body.exercisesID,
                name: req.body.name,
                description: req.body.description,
                objectives: req.body.objectives,
                authorName: req.body.authorName,
                location: req.body.location,
                frequency: req.body.frequency,
                duration: req.body.duration,
                targetDate: req.body.targetDate,
                multimediaURL: req.body.multimediaURL,
                rehabilitationPlans: req.body.rehabilitationPlans
            });

            //save it
            exercises.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "exercises saved!"});
                }
            })
        }
    })

    //update exercises
    router.put('/exercises/:exercisesID', function (req, res) {
        if (!(req.params.exercisesID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Exercises.findOne({exercisesID: req.params.exercisesID}, function (err, exercises) {
                if (err) {
                    res.json({success: false, message: err});
                } else {

                    if (req.body.name) {
                        //update with new name
                        exercises.name= req.body.name;
                    }

                    if (req.body.description) {
                        //update with new description
                        exercises.description= req.body.description;
                    }

                    if (req.body.objectives) {
                        //update with new objectives
                        exercises.objectives= req.body.objectives;
                    }

                    if (req.body.authorName) {
                        //update with new authorName
                        exercises.authorName = req.body.authorName;
                    }

                    if (req.body.actionSteps) {
                        //update with new actionSteps
                        exercises.actionSteps = req.body.actionSteps;
                    }

                    if (req.body.location) {
                        //update with new frequency
                        exercises.frequency = req.body.frequency;
                    }

                    if (req.body.frequency) {
                        //update with new frequency
                        exercises.frequency = req.body.frequency;
                    }
                    
                    if (req.body.duration) {
                        //update with new duration
                        exercises.duration = req.body.duration;
                    }

                    if (req.body.targetDate) {
                        //update with new targetDate
                        exercises.targetDate = req.body.targetDate;
                    }

                    if (req.body.multimediaURL) {
                        //update with new multimediaURL
                        exercises.multimediaURL = req.body.multimediaURL;
                    }

                    if (req.body.rehabilitationPlans) {
                        //update with new rehabilitationPlans
                        exercises.rehabilitationPlans = req.body.rehabilitationPlans;
                    }

                    //save changes
                    exercises.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to exercises saved!'});
                        }
                    })
                }
            })
        }
    })

    //delete exercises
    router.delete('/exercises/:exercisesID', function (req, res) {
        if (!(req.params.exercisesID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Exercises.findOne({exercisesID: req.params.exercisesID}, function (err, exercises) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    exercises.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'exercises deleted!'});
                        }
                    })
                }
            })
        }
    })

    return router;
}
