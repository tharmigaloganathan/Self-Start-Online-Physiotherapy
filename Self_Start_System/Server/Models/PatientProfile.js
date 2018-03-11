var mongoose = require('mongoose');
var patientProfileSchema = mongoose.Schema(
    {

        familyName: String,
        givenName: String,
        email: String,
        DOB: Date,
        postalCode: String,
        address: String,
        phone: String,
        others: String,
        account: {type: mongoose.Schema.ObjectId, ref: 'UserAccount'},
        treatments: [{type: mongoose.Schema.ObjectId, ref: 'Treatment'}],
        payments: [{type: mongoose.Schema.ObjectId, ref: 'Payment'}],
        country: {type: mongoose.Schema.ObjectId, ref: 'Country'},
        province: {type: mongoose.Schema.ObjectId, ref: 'Province'},
        city: String,
        gender: {type: mongoose.Schema.ObjectId, ref: 'Gender'},
        appointments: [{type: mongoose.Schema.ObjectId, ref: 'Appointment'}]
    }
);
var PatientProfiles = module.exports = mongoose.model('PatientProfile', patientProfileSchema);


module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        PatientProfiles.findById(id, function (error, document) {
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
        } else if (!updatedDocument.DOB){
            error = "No DOB detected.";
            reject(error);
        } else if (!updatedDocument.postalCode){
            error = "No postalCode detected.";
            reject(error);
        } else if (!updatedDocument.address){
            error = "No address detected.";
            reject(error);
        } else if (!updatedDocument.phone){
            error = "No phone detected.";
            reject(error);
        } else if (!updatedDocument.city){
            error = "No cities detected.";
            reject(error);
        } else {
            PatientProfiles.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.familyName = updatedDocument.familyName;
                    document.givenName = updatedDocument.givenName;
                    document.email = updatedDocument.email;
                    document.DOB = updatedDocument.DOB;
                    document.postalCode = updatedDocument.postalCode;
                    document.address = updatedDocument.address;
                    document.phone = updatedDocument.phone;
                    document.others = updatedDocument.others;
                    document.account = updatedDocument.account;
                    document.treatments = updatedDocument.treatments;
                    document.payments = updatedDocument.payments;
                    document.country = updatedDocument.country;
                    document.province = updatedDocument.province;
                    document.city = updatedDocument.city;
                    document.gender = updatedDocument.gender;
                    document.appointments = updatedDocument.appointments;
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
        PatientProfiles.findById(id, function (error, document) {
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
        PatientProfiles.find({}, function (error, documents) {
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
        var document = new PatientProfiles(object);
        if (!document.familyName){
            error = "No familyName detected.";
            reject(error);
        } else if (!document.givenName){
            error = "No givenName detected.";
            reject(error);
        } else if (!document.email){
            error = "No email detected.";
            reject(error);
        } else if (!document.DOB){
            error = "No DOB detected.";
            reject(error);
        } else if (!document.postalCode){
            error = "No postalCode detected.";
            reject(error);
        } else if (!document.address){
            error = "No address detected.";
            reject(error);
        } else if (!document.phone){
            error = "No phone detected.";
            reject(error);
        } else if (!document.city){
            error = "No cities detected.";
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
