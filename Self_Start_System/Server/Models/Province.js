var mongoose = require('mongoose');
var provinceSchema = mongoose.Schema(
    {
        name: String,
        patientProfiles: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        cities: [{type: mongoose.Schema.ObjectId, ref: 'City'}],
        country: {type: mongoose.Schema.ObjectId, ref: 'Country'}
    }
);
var Provinces = module.exports = mongoose.model('Province', provinceSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Provinces.findById(id, function (error, document) {
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
        } else if (!updatedDocument.cities){
            err = "No cities detected.";
            reject(err);
        } else if (!updatedDocument.country){
            err = "No country detected.";
            reject(err);
        } else {
            Provinces.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.name = updatedDocument.name;
                    document.patientProfiles = updatedDocument.patientProfiles;
                    document.cities = updatedDocument.cities;
                    document.country = updatedDocument.country;
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
        Provinces.findById(id, function (error, document) {
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
        Provinces.find({}, function (error, documents) {
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
        var document = new Provinces(object);
        if (!document.name){
            err = "No name detected.";
            reject(err);
        } else if (!document.patientProfiles){
            err = "No patientProfiles detected.";
            reject(err);
        } else if (!document.cities){
            err = "No cities detected.";
            reject(err);
        } else if (!document.country){
            err = "No country detected.";
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


