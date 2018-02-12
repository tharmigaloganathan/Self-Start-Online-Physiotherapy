var mongoose = require('mongoose');
var userAccountSchema = mongoose.Schema(
    {
        userAccountName: String,
        encryptedPassword: String,
        //Check which of the following FKs is non-null to see what type of user (Admin, Physio, Patient) the user is.
        administrator: {type: mongoose.Schema.ObjectId, ref: 'Administrator'},
        physiotherapist: {type: mongoose.Schema.ObjectId, ref: 'Physiotherapist'},
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}
    }
);
var UserAccounts = module.exports =  mongoose.model('UserAccount', userAccountSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        UserAccounts.findById(id, function (error, document) {
            if (error){
                reject(error);
            }else{
                document.remove(function (err) {
                    if (err){
                        reject(error);
                    } else {
                        resolve(document);
                    }
                })
            }
        });
    });
}

function update(id, updatedDocument){
    return new Promise (function (resolve, reject) {
        if (!updatedDocument.userAccountName){
            err = "No userAccountName detected.";
            reject(err);
        } else if (!updatedDocument.encryptedPassword){
            err = "No encryptedPassword detected.";
            reject(err);
        } else if (!updatedDocument.administrator){
            err = "No administrator detected.";
            reject(err);
        } else if (!updatedDocument.physiotherapist){
            err = "No physiotherapist detected.";
            reject(err);
        } else if (!updatedDocument.patientProfile){
            err = "No patientProfile detected.";
            reject(err);
        } else {
            UserAccounts.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.userAccountName = updatedDocument.userAccountName;
                    document.encryptedPassword = updatedDocument.encryptedPassword;
                    document.administrator = updatedDocument.administrator;
                    document.physiotherapist = updatedDocument.physiotherapist;
                    document.patientProfile = updatedDocument.patientProfile;
                    document.save(function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(document);
                        }
                    });
                }
            });
        }
    });
}

function getOne(id){
    return new Promise (function (resolve, reject) {
        UserAccounts.findById(id, function (error, document) {
            if (error){
                reject(error);
            }else{
                resolve(document);
            }
        });
    });
}

function getAll(){
    return new Promise (function (resolve, reject) {
        UserAccounts.find({}, function (error, documents) {
            if (error){
                reject(error);
            }else{
                resolve(documents);
            }
        });
    });
}

function add(object){
    return new Promise (function (resolve, reject) {
        var document = new UserAccounts(object);
        if (!document.userAccountName){
            err = "No userAccountName detected.";
            reject(err);
        } else if (!document.encryptedPassword){
            err = "No encryptedPassword detected.";
            reject(err);
        } else if (!document.administrator){
            err = "No administrator detected.";
            reject(err);
        } else if (!document.physiotherapist){
            err = "No physiotherapist detected.";
            reject(err);
        } else if (!document.patientProfile){
            err = "No patientProfile detected.";
            reject(err);
        } else {
            document.save(function (error) {
                if (error){
                    reject(err);
                }else{
                    resolve(document);
                }
            });
        }
    });
}


