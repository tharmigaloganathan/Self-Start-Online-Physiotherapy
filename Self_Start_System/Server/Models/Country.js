var mongoose = require('mongoose');
var countrySchema = mongoose.Schema(
    {
        name: String,
        patientProfiles: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        provinces: [{type: mongoose.Schema.ObjectId, ref: 'Province'}]
    }
);
var Countries = module.exports = mongoose.model('Country', countrySchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Countries.findById(id, function (error, country) {
            if (error){
                reject(error);
            }else{
                country.remove(function (err) {
                    if (error){
                        reject(error);
                    } else {
                        resolve(country);
                    }
                })
            }
        });
    });
}

function update(id, updatedCountry){
    return new Promise (function (resolve, reject) {
        if (!updatedCountry.name){
            error = "No name detected.";
            reject(error);
        } else {
            Countries.findById(id, function (error, country) {
                if (error) {
                    reject(error);
                }
                else {
                    country.name = updatedCountry.name;
                    country.patientProfiles = updatedCountry.patientProfiles;
                    country.provinces = updatedCountry.provinces;
                    country.save(function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(country);
                        }
                    });
                }
            });
        }
    });
}

function getOne(id){
    return new Promise (function (resolve, reject) {
        Countries.findById(id, function (error, country) {
            if (error){
                reject(error);
            }else{
                resolve(country);
            }
        });
    });
}

function getAll(){
    return new Promise (function (resolve, reject) {
        Countries.find({}, function (error, countries) {
            if (error){
                reject(error);
            }else{
                resolve(countries);
            }
        });
    });
}

function add(country){
    return new Promise (function (resolve, reject) {
        var newCountry = new Countries(country);
        if (!newCountry.name){
            error = "No name detected.";
            reject(error);
        } else {
            newCountry.save(function (error) {
                if (error){
                    reject(error);
                }else{
                    resolve(newCountry);
                }
            });
        }
    });
}



