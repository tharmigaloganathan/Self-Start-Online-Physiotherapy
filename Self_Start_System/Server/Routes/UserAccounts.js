var express = require('express');
var router = express.Router();
var UserAccounts = require('../Models/UserAccount');
var Administrators = require('../Models/Administrator');
var Physiotherapists = require('../Models/Physiotherapist');
var PatientProfiles = require('../Models/PatientProfile');

router.route('/')
    .post(function (request, response) {

        if(request.body.administrator){
            Administrators.add(request.body.administrator).then(function(document){
                request.body.administrator = document._id; // Replace administrator object provided with ID of document created
                administratorObject = document;
            }).catch(function(err){
                console.log(err);
            });
        }else if(request.body.physiotherapist){
            Physiotherapists.add(request.body.physiotherapist).then(function(document){
                request.body.physiotherapist = document._id; // Replace physiotherapist object provided with ID of document created
                physiotherapistObject = document;
            }).catch(function(err){
                console.log(err);
            });
        }else if(request.body.patientProfile){
            PatientProfiles.add(request.body.patientProfile).then(function(document){
                request.body.patientProfile = document._id; // Replace patientProfile object provided with ID of document created
                patientProfileObject = document;
            }).catch(function(err){
                console.log(err);
            });
        }

        UserAccounts.add(request.body).then(function(userAccount){

            if(administratorObject){
                administratorObject.userAccount = userAccount._id;  // Set the userAccount reference of the administrator just created
                Administrators.update(administratorObject._id, administratorObject).then(function(document){
                    console.log(document);
                }).catch(function(err){
                    console.log(err);
                });
            }else if(physiotherapistObject){
                physiotherapistObject.userAccount = userAccount._id;  // Set the userAccount reference of the physiotherapist just created
                Physiotherapists.update(physiotherapistObject._id, physiotherapistObject).then(function(document){
                    console.log(document);
                }).catch(function(err){
                    console.log(err);
                });
            }else if(patientProfileObject){
                patientProfileObject.userAccount = userAccount._id;  // Set the userAccount reference of the patientProfile just created
                PatientProfiles.update(patientProfileObject._id, patientProfileObject).then(function(document){
                    console.log(document);
                }).catch(function(err){
                    console.log(err);
                });
            }

            userAccount.administrator = administrator._id;
            UserAccounts.update(userAccount._id, userAccount).then(function(userAccount){   // I then update the administrator reference of the associated userAccount
                console.log(userAccount);
            }).catch(function(err){
                console.log(err);
            });

            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        UserAccounts.getAll().then(function(userAccounts){
            userAccounts.forEach(function(userAccount){
                if(userAccount.administrator){
                    Administrators.getOne(userAccount.administrator).then(function(document){
                        userAccount.administrator = document;   // Replace the id in the field with the object so you have the needed data on the front end
                    }).catch(function(err){
                        console.log(err);
                    });
                }else if(userAccount.physiotherapist){
                    Physiotherapists.getOne(userAccount.physiotherapist).then(function(document){
                        userAccount.physiotherapist = document; // Replace the id in the field with the object so you have the needed data on the front end
                    }).catch(function(err){
                        console.log(err);
                    });
                }else if(userAccount.patientProfile){
                    PatientProfiles.getOne(userAccount.patientProfile).then(function(document){
                        userAccount.patientProfile = document;  // Replace the id in the field with the object so you have the needed data on the front end
                    }).catch(function(err){
                        console.log(err);
                    });
                }
            });
            response.json({userAccount: userAccounts});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.getOne(request.params.object_id).then(function(userAccount){
            if(userAccount.administrator){
                Administrators.getOne(userAccount.administrator).then(function(document){
                    userAccount.administrator = document;   // Replace the id in the field with the object so you have the needed data on the front end
                }).catch(function(err){
                    console.log(err);
                });
            }else if(userAccount.physiotherapist){
                Physiotherapists.getOne(userAccount.physiotherapist).then(function(document){
                    userAccount.physiotherapist = document; // Replace the id in the field with the object so you have the needed data on the front end
                }).catch(function(err){
                    console.log(err);
                });
            }else if(userAccount.patientProfile){
                PatientProfiles.getOne(userAccount.patientProfile).then(function(document){
                    userAccount.patientProfile = document;  // Replace the id in the field with the object so you have the needed data on the front end
                }).catch(function(err){
                    console.log(err);
                });
            }
            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.update(request.params.object_id, request.body).then(function(userAccount){
            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.deleteOne(request.params.object_id).then(function(userAccount){
            response.json({success: true, message: 'userAccount deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
