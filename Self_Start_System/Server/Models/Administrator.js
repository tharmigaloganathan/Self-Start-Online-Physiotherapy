var mongoose = require ('mongoose');
var administratorSchema = mongoose.Schema(
    {
        familyName: String,
        givenName: String,
        email: String,
        dateHired: Date,
        dateFinished: Date,
        //Keep forms, but make the post not require them (ie put in null)
        forms: [{type: mongoose.Schema.ObjectId, ref: 'Form'}],
        userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}
    }
);

var Administrators = module.exports = mongoose.model('Administrator', administratorSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Administrators.findById(id, function (error, document) {
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
        if (!updatedDocument.familyName){
            error = "No familyName detected.";
            reject(error);
        } else if (!updatedDocument.givenName){
            error = "No givenName detected.";
            reject(error);
        } else if (!updatedDocument.email){
            error = "No email detected.";
            reject(error);
        } else if (!updatedDocument.dateHired){
            error = "No dateHired detected.";
            reject(error);
        } else if (!updatedDocument.dateFinished){
            error = "No dateFinished detected.";
            reject(error);
        } else {
            Administrators.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.familyName = updatedDocument.familyName;
                    document.givenName = updatedDocument.givenName;
                    document.email = updatedDocument.email;
                    document.dateHired = updatedDocument.dateHired;
                    document.dateFinished = updatedDocument.dateFinished;
                    document.forms = updatedDocument.forms;
                    document.userAccount = updatedDocument.userAccount;
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
        Administrators.findById(id, function (error, document) {
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
        Administrators.find({}, function (error, documents) {
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
        var document = new Administrators(object);
        if (!document.familyName){
            error = "No familyName detected.";
            reject(error);
        } else if (!document.givenName){
            error = "No givenName detected.";
            reject(error);
        } else if (!document.email){
            error = "No email detected.";
            reject(error);
        } else if (!document.dateHired){
            error = "No dateHired detected.";
            reject(error);
        } else if (!document.dateFinished){
            error = "No dateFinished detected.";
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

