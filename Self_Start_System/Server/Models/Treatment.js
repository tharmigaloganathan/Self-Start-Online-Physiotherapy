var mongoose = require('mongoose');
var treatmentsSchema = mongoose.Schema(
	{
		dateAssign: Date,
		physiotherapist: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
		patientProfile: {type: mongoose.Schema.ObjectId, ref: ('PatientProfile')},
		rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlan')},
		recommendations: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}]
	}
);

var Treatments = module.exports = mongoose.model('Treatment', treatmentsSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Treatments.findById(id, function (error, document) {
            if (error){
                reject(error);
            }else{
                document.remove(function (err) {
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
        if (!updatedDocument.dateAssign){
            error = "No dateAssign detected.";
            reject(error);
        } else {
            Treatments.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.dateAssign = updatedDocument.dateAssign;
                    document.physiotherapist = updatedDocument.physiotherapist;
                    document.patientProfile = updatedDocument.patientProfile;
                    document.rehabilitationPlan = updatedDocument.rehabilitationPlan;
                    document.recommendations = updatedDocument.recommendations;
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
        Treatments.findById(id, function (error, document) {
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
        Treatments.find({}, function (error, documents) {
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
        var document = new Treatments(object);
        if (!document.dateAssign){
            error = "No dateAssign detected.";
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

