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
        maritalStatus: String,
        healthCardNumber: String,
        occupation: String,
        others: String,
        account: {type: mongoose.Schema.ObjectId, ref: 'UserAccount'},
        payments: [{type: mongoose.Schema.ObjectId, ref: 'Payment'}],
        country: {type: mongoose.Schema.ObjectId, ref: 'Country'},
        province: {type: mongoose.Schema.ObjectId, ref: 'Province'},
        city: {type: mongoose.Schema.ObjectId, ref: 'City'},
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
        } else if (!updatedDocument.DOB){
            err = "No DOB detected.";
            reject(err);
        } else if (!updatedDocument.postalCode){
            err = "No postalCode detected.";
            reject(err);
        } else if (!updatedDocument.address){
            err = "No address detected.";
            reject(err);
        } else if (!updatedDocument.phone){
            err = "No phone detected.";
            reject(err);
        } else if (!updatedDocument.maritalStatus){
            err = "No maritalStatus detected.";
            reject(err);
        } else if (!updatedDocument.healthCardNumber){
            err = "No healthCardNumber detected.";
            reject(err);
        } else if (!updatedDocument.occupation){
            err = "No occupation detected.";
            reject(err);
        } else if (!updatedDocument.others){
            err = "No others detected.";
            reject(err);
        } else if (!updatedDocument.account){
            err = "No account detected.";
            reject(err);
        } else if (!updatedDocument.payments){
            err = "No payments detected.";
            reject(err);
        } else if (!updatedDocument.country){
            err = "No country detected.";
            reject(err);
        } else if (!updatedDocument.province){
            err = "No province detected.";
            reject(err);
        } else if (!updatedDocument.city){
            err = "No city detected.";
            reject(err);
        } else if (!updatedDocument.gender){
            err = "No gender detected.";
            reject(err);
        } else if (!updatedDocument.appointments){
            err = "No appointments detected.";
            reject(err);
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
                    document.maritalStatus = updatedDocument.maritalStatus;
                    document.healthCardNumber = updatedDocument.healthCardNumber;
                    document.occupation = updatedDocument.occupation;
                    document.others = updatedDocument.others;
                    document.account = updatedDocument.account;
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
            err = "No familyName detected.";
            reject(err);
        } else if (!document.givenName){
            err = "No givenName detected.";
            reject(err);
        } else if (!document.email){
            err = "No email detected.";
            reject(err);
        } else if (!document.DOB){
            err = "No DOB detected.";
            reject(err);
        } else if (!document.postalCode){
            err = "No postalCode detected.";
            reject(err);
        } else if (!document.address){
            err = "No address detected.";
            reject(err);
        } else if (!document.phone){
            err = "No phone detected.";
            reject(err);
        } else if (!document.maritalStatus){
            err = "No maritalStatus detected.";
            reject(err);
        } else if (!document.healthCardNumber){
            err = "No healthCardNumber detected.";
            reject(err);
        } else if (!document.occupation){
            err = "No occupation detected.";
            reject(err);
        } else if (!document.others){
            err = "No others detected.";
            reject(err);
        } else if (!document.account){
            err = "No account detected.";
            reject(err);
        } else if (!document.payments){
            err = "No payments detected.";
            reject(err);
        } else if (!document.country){
            err = "No country detected.";
            reject(err);
        } else if (!document.province){
            err = "No province detected.";
            reject(err);
        } else if (!document.city){
            err = "No city detected.";
            reject(err);
        } else if (!document.gender){
            err = "No gender detected.";
            reject(err);
        } else if (!document.appointments){
            err = "No appointments detected.";
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

