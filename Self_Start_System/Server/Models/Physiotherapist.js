var mongoose = require('mongoose');
var physiotherapistSchema = mongoose.Schema(
	{
		familyName: String,
		givenName: String,
		email: String,
		dateHired: Date,
		dateFinished: Date,
		treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatment')}],
		userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}
	}
);

var Physiotherapists = module.exports =  mongoose.model('Physiotherapist', physiotherapistSchema);


module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Physiotherapists.findById(id, function (error, document) {
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
        if (!updatedDocument.familyName){
            err = "No familyName detected.";
            reject(err);
        } else if (!updatedDocument.givenName){
            err = "No givenName detected.";
            reject(err);
        } else if (!updatedDocument.email){
            err = "No email detected.";
            reject(err);
        } else if (!updatedDocument.dateHired){
            err = "No dateHired detected.";
            reject(err);
        } else if (!updatedDocument.dateFinished){
            err = "No dateFinished detected.";
            reject(err);
        } else if (!updatedDocument.treatments){
            err = "No treatments detected.";
            reject(err);
        } else if (!updatedDocument.userAccount){
            err = "No userAccount detected.";
            reject(err);
        } else {
            Physiotherapists.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.familyName = updatedDocument.familyName;
                    document.givenName = updatedDocument.givenName;
                    document.email = updatedDocument.email;
                    document.dateHired = updatedDocument.dateHired;
                    document.dateFinished = updatedDocument.dateFinished;
                    document.treatments = updatedDocument.treatments;
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
        Physiotherapists.findById(id, function (error, document) {
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
        Physiotherapists.find({}, function (error, documents) {
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
        var document = new Physiotherapists(object);
        if (!document.familyName){
            err = "No familyName detected.";
            reject(err);
        } else if (!document.givenName){
            err = "No givenName detected.";
            reject(err);
        } else if (!document.email){
            err = "No email detected.";
            reject(err);
        } else if (!document.dateHired){
            err = "No dateHired detected.";
            reject(err);
        } else if (!document.dateFinished){
            err = "No dateFinished detected.";
            reject(err);
        } else if (!document.treatments){
            err = "No treatments detected.";
            reject(err);
        } else if (!document.userAccount){
            err = "No userAccount detected.";
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


