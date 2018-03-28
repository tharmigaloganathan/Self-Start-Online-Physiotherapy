var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

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
    deleteOne:deleteOne,
    login:login,
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
        console.log("in Model, getByName name is: ", name);
        UserAccounts.find({userAccountName: name}, function (error, document) {
            if (error){
                reject(error);
            }else{
                console.log("in Model, getByName: ", document[0]);
                resolve(document[0]);
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
        console.log("within add of UserAccount Model");
        var document = new UserAccounts(object);

        if (!document.userAccountName){
            error = "No userAccountName detected.";
            reject(error);
        } else if (!document.encryptedPassword){
            error = "No encryptedPassword detected.";
            reject(error);
        } else {

            //make a hash and assign it back to password
            console.log("the password hashing: ", document.encryptedPassword);
            document.encryptedPassword = bcrypt.hashSync(document.encryptedPassword);
            //this if hash is working
            console.log("hashed password: ", document.encryptedPassword);

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

function checkPassword (enteredPassword, encryptedPassword){
    return bcrypt.compareSync(enteredPassword, encryptedPassword);
}

// userAccountSchema.methods.comparePassword = function (password){
//     return bcrypt.compareSync(password, this.password);
// };

function login(object, userEnteredPassword){
    return new Promise (function (resolve, reject) {
        console.log ("in LOGIN in model, object is: ", object);
        console.log ("in LOGIN in model, the password the user entered is: ", userEnteredPassword);
        console.log ("in LOGIN in model, encrypted password is: ", object.encryptedPassword);

        var validPassword = checkPassword(userEnteredPassword, object.encryptedPassword);
        console.log("the status of the password: ", validPassword);

        if (!validPassword) {
            console.log("in model, password doest not match");
            error = "Password Invalid/Does not match.";
            reject(error);
        } else {
            console.log ("in model, password matches!");
            resolve(object);
        }

    })
}



