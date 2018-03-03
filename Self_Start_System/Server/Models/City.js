var mongoose = require('mongoose');
var citySchema = mongoose.Schema(
    {
        name: String,
        patientProfiles: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        province: {type: mongoose.Schema.ObjectId, ref: 'Province'}
    }
);
var Cities = module.exports = mongoose.model('City', citySchema);


module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Cities.findById(id, function (error, city) {
            if (error){
                reject(error);
            }else{
                city.remove(function (err) {
                    if (error){
                        reject(error);
                    } else {
                        resolve(city);
                    }
                })
            }
        });
    });
}

function update(id, updatedCity){
    return new Promise (function (resolve, reject) {
        if (!updatedCity.name){
            error = "No name detected.";
            reject(error);
        } else {
            Cities.findById(id, function (error, city) {
                if (error) {
                    reject(error);
                }
                else {
                    city.name = updatedCity.name;
                    city.patientProfiles = updatedCity.patientProfiles;
                    city.province = updatedCity.province;
                    city.save(function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(city);
                        }
                    });
                }
            });
        }
    });
}

function getOne(id){
    return new Promise (function (resolve, reject) {
        Cities.findById(id, function (error, city) {
            if (error){
                reject(error);
            }else{
                resolve(city);
            }
        });
    });
}

function getAll(){
    return new Promise (function (resolve, reject) {
        Cities.find({}, function (error, cities) {
            if (error){
                reject(error);
            }else{
                resolve(cities);
            }
        });
    });
}

function add(city){
    return new Promise (function (resolve, reject) {
        var newCity = new Cities(city);
        if (!newCity.name){
            error = "No name detected.";
            reject(error);
        } else {
            newCity.save(function (error) {
                if (error){
                    reject(error);
                }else{
                    resolve(newCity);
                }
            });
        }
    });
}


