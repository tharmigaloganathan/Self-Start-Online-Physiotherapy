var mongoose = require('mongoose');
var genderSchema = mongoose.Schema(
    {
        name: String,
        patientProfiles: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}]
    }
);
var Genders = module.exports=  mongoose.model('Gender', genderSchema);


module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Genders.findById(id, function (error, document) {
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
        if (!updatedDocument.name){
            err = "No name detected.";
            reject(err);
        } else if (!updatedDocument.patientProfiles){
            err = "No patientProfiles detected.";
            reject(err);
        } else {
            Genders.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.name = updatedDocument.name;
                    document.patientProfiles = updatedDocument.patientProfiles;
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
        Genders.findById(id, function (error, document) {
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
        Genders.find({}, function (error, documents) {
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
        var document = new Genders(object);
        if (!document.name){
            err = "No name detected.";
            reject(err);
        } else if (!document.patientProfiles){
            err = "No patientProfiles detected.";
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


