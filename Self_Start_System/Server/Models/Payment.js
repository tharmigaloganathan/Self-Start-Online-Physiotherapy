var mongoose = require('mongoose');
var paymentsSchema = mongoose.Schema(
    {
        dayTimeStamp: Date,
        amount: Number,
        note: String,
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}
    }
);
var Payments = module.exports = mongoose.model('Payment', paymentsSchema);


module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Payments.findById(id, function (error, document) {
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
        if (!updatedDocument.dayTimeStamp){
            err = "No dayTimeStamp detected.";
            reject(err);
        } else if (!updatedDocument.amount){
            err = "No amount detected.";
            reject(err);
        } else if (!updatedDocument.note){
            err = "No note detected.";
            reject(err);
        } else if (!updatedDocument.patientProfile){
            err = "No patientProfile detected.";
            reject(err);
        } else {
            Payments.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.dayTimeStamp = updatedDocument.dayTimeStamp;
                    document.amount = updatedDocument.amount;
                    document.note = updatedDocument.note;
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
        Payments.findById(id, function (error, document) {
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
        Payments.find({}, function (error, documents) {
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
        var document = new Payments(object);
        if (!document.dayTimeStamp){
            err = "No dayTimeStamp detected.";
            reject(err);
        } else if (!document.amount){
            err = "No amount detected.";
            reject(err);
        } else if (!document.note){
            err = "No note detected.";
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

