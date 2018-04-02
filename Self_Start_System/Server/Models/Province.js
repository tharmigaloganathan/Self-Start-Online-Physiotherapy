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
    deleteOne:deleteOne,
    getByCountry:getByCountry
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Provinces.findById(id, function (error, document) {
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
        if (!updatedDocument.name){
            error = "No name detected.";
            reject(error);
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

function getByCountry(countryID){
    return new Promise (function (resolve, reject) {
        Provinces.find({country: countryID}, function (error, documents) {
            if (error){
                reject(error);
            }else{
                console.log("Provinces found: " + documents);
                resolve(documents);
            }
        });
    });
}
function add(object){
    return new Promise (function (resolve, reject) {
        var document = new Provinces(object);
        if (!document.name){
            error = "No name detected.";
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


