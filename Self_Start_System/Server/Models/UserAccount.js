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
    getByName:getByName,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        UserAccounts.findById(id, function (error, document) {
            if (error){
                reject(error);
            }else{
                document.remove(function (error) {
                    if (error){
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
            error = "No userAccountName detected.";
            reject(error);
        } else if (!updatedDocument.encryptedPassword){
            error = "No encryptedPassword detected.";
            reject(error);
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

function getByName(name){
    return new Promise (function (resolve, reject) {
        UserAccounts.find({userAccountName: name}, function (error, document) {
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
            error = "No userAccountName detected.";
            reject(error);
        } else if (!document.encryptedPassword){
            error = "No encryptedPassword detected.";
            reject(error);
        } else {
            document.save(function (error) {
                if (error){
                    reject(error);
                }else{
                    resolve(document);
                }
            });
        }
    });
}


