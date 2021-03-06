var express = require('express');
var router = express.Router();
var UserAccounts = require('../Models/UserAccount');
var Administrators = require('../Models/Administrator');
var Physiotherapists = require('../Models/Physiotherapist');
var PatientProfiles = require('../Models/PatientProfile');

//for tokens & verification & login sessions
const jwt = require('jsonwebtoken');
const config = require('../Config/Database');
const nodemailer = require('nodemailer');

const loginPage = '"http://localhost:8080/login"';

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
                let profileID;
                let profileType;
                if (userAccount.patientProfile){
                    profileID = userAccount.patientProfile;
                    profileType = "patient"
                } else if (userAccount.physiotherapist){
                    profileID = userAccount.physiotherapist;
                    profileType = "physiotherapist"
                } else if (userAccount.administrator) {
                    profileID = userAccount.administrator;
                    profileType= "administrator";
                }

                const token = jwt.sign({_id: userAccount._id, profileID: profileID,  profileType: profileType}, config.secret, {expiresIn: '24h'});
                console.log("token made: ", token);

                response.json({success: true, message: "Account authenticated!", token: token, userAccount: userAccount});

            }).catch(function(err){
                response.json({success: false, message: err});
            })

        }).catch(function(err){
            response.json({success: false, message: err});
        })



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

router.route('/updatePassword/:object_id')
    .put(function (request, response) {
        console.log ("in update user account password route, here's the new password: ", request.body.user.encryptedPassword);
        var newPassword = request.body.user.encryptedPassword;
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.updatePassword(request.params.object_id, request.body.user).then(function(userAccount){
            //email only sends when its resetting password to a temporary password, not for saving a new password
            if (request.body.reset) {
                console.log("sending temporary password to: ", request.body.email);

                // create reusable transporter object using the default SMTP transport
                var transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com", // hostname
                    secureConnection: false, // TLS requires secureConnection to be false
                    port: 587, // port for secure SMTP
                    tls: {
                        ciphers: 'SSLv3'
                    },
                    auth: {
                        user: 'selfstart1@hotmail.com',
                        pass: 'ademidun1'
                    }
                });

                // setup email data with unicode symbols
                var mailOptions = {
                    from: '"Admin" <selfstart1@hotmail.com>', // sender address
                    to: request.body.email, // list of receivers
                    subject: 'Password Reset Notice!', // Subject line
                    text: " ", // plain text body
                    html: `
<p>Your password has been reset! here is your new temporary password: ${newPassword}</p>
<a href = ${loginPage}>click to login</a>
`// html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    transporter.verify(function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Server is ready to take our messages');
                        }
                    });
                });
            }
                response.json({success: true, userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/id/:object_id')
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
        console.log ("in update user account route");
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
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




//middleware for every route below this one
router.use(function (req, res, next) {
    console.log('in authentication middleware');
    const token = req.headers.authorization;

    console.log('token: ', token);

    if (!token) {
        res.json({success: false, message: 'No token provided'}); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                res.json({success: false, message: 'Token invalid: ' + err}); // Return error for token validation
            } else {
                req.decoded = decoded; // Create global variable to use in any request beyond
                console.log('authentication middleware complete!');
                next(); // Exit middleware
            }

        })
    }
});

router.route('/activeUser/editProfile')
    .get (function(req, res) {
        console.log("in user accounts getActiveUser route, looking for id: ", req.decoded._id);
        if (!req.decoded._id) {
            res.json({success: false, message: 'user account ID was not provided'});
        }
        UserAccounts.getOne(req.decoded._id).then(function(user) {
            if (!user) {
                res.json({success: false, message: "User not found"});
            } else {
                console.log('at end of UserAccounts getUser route');
                res.json({success: true, userAccount: user});
            }
        }).catch(function(err) {
            console.log(err);
            response.json({success: false, message: err});
        })

    });



module.exports = router;
