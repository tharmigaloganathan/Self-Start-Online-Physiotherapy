const UserAccount = require('../Models/UserAccount');

module.exports = function (router){

    //get specific UserAccount
    router.get('/:userAccountID', function (req, res) {
        if (!(req.params.userAccountID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            UserAccount.findOne({userAccountID: req.params.userAccountID}, function (err, userAccount) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //return userAccount object
                    res.json({
                        success: true,
                        message: ('Success! Retrieved userAccount with id ' + req.params.userAccountID),
                        userAccount: userAccount
                    })
                }
            })
        }
    });

    //get all userAccounts
    router.get('/', function (req, res) {
        UserAccount.find({}, function (err, userAccounts) {
            if (err) {
                res.json({success: false, message: err});
            } else {
                //return all userAccounts
                res.json({
                    success: true,
                    message: 'Success! Retrieved all userAccounts',
                    userAccounts: userAccounts
                })
            }
        })
    });

    //post a userAccount
    router.post('/', function (req, res) {
        if (!req.body.userAccountID){
            res.json({success: false, message: "No userAccountID detected."});
        } else if (!req.body.userAccountName) {
            res.json({success: false, message: "No userAccountName detected."});
        } else if (!req.body.encryptedPassword) {
            res.json({success: false, message: "No encryptedPassword detected."});
        } else {

            //create a new userAccount instance to be saved
            var userAccount = new UserAccount({
                encryptedPassword: req.body.encryptedPassword,
                userAccountName: req.body.userAccountName
            });

            //save it
            userAccount.save(function (err) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: "UserAccount saved!"});
                }
            })
        }
    });

    //change decision and time stamp of userAccount
    router.put('/:userAccountID', function (req, res) {
        if (!req.body.userAccountID){
            res.json({success: false, message: "No userAccountID detected."});
        } else if (!req.body.userAccountName) {
            res.json({success: false, message: "No userAccountName detected."});
        } else if (!req.body.encryptedPassword) {
            res.json({success: false, message: "No encryptedPassword detected."});
        } else {
            UserAccount.findOne({userAccountID: req.params.userAccountID}, function (err, userAccount) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    //update to new decision and time stamp
                    userAccount.userAccountName = req.body.userAccountName;
                    userAccount.encryptedPassword = req.body.encryptedPassword;

                    //save changes
                    userAccount.save(function (err){
                        if (err){
                            res.json({ success: false, message: err });
                        } else {
                            res.json({success: true, message: 'changes to userAccount saved!'});
                        }
                    })
                }
            })
        }
    });

    //delete userAccount
    router.delete('/:userAccountID', function (req, res) {
        if (!(req.params.userAccountID)) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            UserAccount.findOne({userAccountID: req.params.userAccountID}, function (err, userAccount) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    userAccount.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'userAccount deleted!'});
                        }
                    })
                }
            })
        }
    });

    return router;
};
