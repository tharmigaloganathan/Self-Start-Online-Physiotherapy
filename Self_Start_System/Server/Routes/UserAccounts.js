var express = require('express');
var router = express.Router();
var UserAccounts = require('../Models/UserAccount');
var Administrators = require('../Models/Administrator');
var Physiotherapists = require('../Models/Physiotherapist');
var PatientProfiles = require('../Models/PatientProfile');

//for tokens & verification & login sessions
const jwt = require('jsonwebtoken');
const config = require('../Config/Database');




router.route('/login')
    .post(function (request, response) {
        console.log("in login route, will be verifying account with username: ", request.body);

        //get the account by checking the unique name
        UserAccounts.getByName(request.body.userAccountName).then(function(userAccount){

            console.log ("password entered by user is: ", request.body.encryptedPassword);
            console.log ("accToVerifyPasswordOn is: ", userAccount);

            //check to see if the password matches the name
            UserAccounts.login(userAccount, request.body.encryptedPassword).then(function(userAccount){
                console.log ("in UserAccounts login :", userAccount);
                //login success
                //create token, encrypt the id, expire in 24hours
                console.log(userAccount._id);

                //get the profile associated with this account
                var profileID;
                if (userAccount.patientProfile){
                    profileID = userAccount.patientProfile;
                } else if (userAccount.physiotherapist){
                    profileID = userAccount.physiotherapist;
                } else if (userAccount.administrator) {
                    profileID = userAccount.administrator;
                }

                const token = jwt.sign({_id: userAccount._id, profileID: profileID}, config.secret, {expiresIn: '24h'});
                console.log("token made: ", token);

                response.json({success: true, message: "Account authenticated!", token: token, userAccount: userAccount});

            }).catch(function(err){
                response.json({success: false, message: err});
            })

        }).catch(function(err){
            response.json({success: false, message: err});
        })



    });
router.route('/:username')
    .get(function (request, response) {
        console.log("within UserAccount route, getting account with username: ", request.params.username);

        UserAccounts.getByName(request.params.username).then(function(userAccount){
            console.log("object retreived from getbyName: ", userAccount);
            if (userAccount) {
                response.json({success: true, userAccount: userAccount});
            } else {
                response.json({success: false, message: "Account was not found "});
            }
        }).catch(function(err){
            console.log(err);
            response.json({success: false, message: err});
        }
        )
    });

router.route('/')
    .post(function (request,response) {
        console.log ("in user account post route, about to add account :", request.body);
        UserAccounts.add(request.body).then(function(userAccount){
            console.log ('the userAccount registered is: ', userAccount);
            //temp variables to hold the profile and temp account for updating
            var tempProfile;
            var tempAccount = userAccount;
            console.log ("Success! this is the account that was just added: ", tempAccount)

            if(userAccount.patientProfile){
                PatientProfiles.getOne(userAccount.patientProfile).then(function(patientProfile){
                    console.log('found the patient profile to link to', patientProfile);

                    //update the reference to the userAccount just created in the patient's profile
                    tempProfile = patientProfile;
                    tempProfile.account = userAccount._id; //for physio & admin, its tempProfile.userAccount, naming differences in model

                    PatientProfiles.update(tempProfile._id, tempProfile).then(function(document){
                        console.log("Success! Here is the updated profile with the ref to the userAccount: ", document);
                    }).catch(function(err){
                        console.log(err);
                    });

                    //update the reference to the patient profile in the just created UserAccount
                    tempAccount.patientProfile = tempProfile._id;
                    UserAccounts.update(tempAccount._id, tempAccount).then(function(document) {
                        console.log ("UserAccount successfully updated! It's patientProfile field should be filled! ", document);
                    }).catch(function(err){
                        console.log(err);
                    })

                }).catch(function(err){
                    console.log(err);
                });

            } else if(userAccount.administrator){
                Administrators.getOne(userAccount.administrator).then(function(adminProfile){
                    console.log('found the administrator to link to', adminProfile);
                    tempProfile = adminProfile;
                    tempProfile.userAccount = userAccount._id;

                    //update the profile with the ref to the user Account
                    Administrators.update(tempProfile._id, tempProfile).then(function(document){
                        console.log("Success! Here is the updated profile with the ref to the userAccount: ", document);
                    }).catch(function(err){
                        console.log(err);
                    });

                    //update the reference to the admin profile in the just created UserAccount
                    tempAccount.administrator = tempProfile._id;
                    UserAccounts.update(tempAccount._id, tempAccount).then(function(document) {
                        console.log ("UserAccount successfully updated! It's administrator field should be filled! ", document);
                    }).catch(function(err){
                        console.log(err);
                    })

                }).catch(function(err){
                    console.log(err);
                });

            } else if(userAccount.physiotherapist){
                Physiotherapists.getOne(userAccount.physiotherapist).then(function(physioProfile){
                    console.log('found the physiotherapist profile to link to', physioProfile);

                    tempProfile = physioProfile;
                    tempProfile.userAccount = userAccount._id;

                    //update the reference to useraccount in the profile
                    Physiotherapists.update(tempProfile._id, tempProfile).then(function(document){
                        console.log("Success! Here is the updated profile with the ref to the userAccount: ", document);
                    }).catch(function(err){
                        console.log(err);
                    });

                    tempAccount.physiotherapist= tempProfile._id;

                    //update the reference to the physiotherapist profile in the just created UserAccount
                    UserAccounts.update(tempAccount._id, tempAccount).then(function(document) {
                        console.log ("UserAccount successfully updated! It's physiotherapist field should be filled! ", document);
                    }).catch(function(err){
                        console.log(err);
                    })                }).catch(function(err){
                    console.log(err);
                });
            }

            // userAccount.administrator = administrator._id;
            // UserAccounts.update(userAccount._id, userAccount).then(function(userAccount){   // I then update the administrator reference of the associated userAccount
            //     console.log(userAccount);
            // }).catch(function(err){
            //     console.log(err);
            // });

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

router.route('/getProfile', function(req, res) {
    UserAccounts.getOne({_id: req.decoded._id}).exec(function(err, user) {
        if (err) {
            res.json({success: false, message: err});
        } else if (!user) {
            res.json({success: false, message: "User not found"});
        } else {
            console.log('at end of UserAccounts getProfile route');
            res.json({success: true, userAccount: userAccount});
        }
    })


})

module.exports = router;
