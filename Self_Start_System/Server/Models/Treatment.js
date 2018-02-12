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
        if (!updatedDocument.dateAssign){
            err = "No dateAssign detected.";
            reject(err);
        } else if (!updatedDocument.physiotherapist){
            err = "No physiotherapist detected.";
            reject(err);
        } else if (!updatedDocument.patientProfile){
            err = "No patientProfile detected.";
            reject(err);
        } else if (!updatedDocument.rehabilitationPlan){
            err = "No rehabilitationPlan detected.";
            reject(err);
        } else if (!updatedDocument.recommendations){
            err = "No recommendations detected.";
            reject(err);
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
            err = "No dateAssign detected.";
            reject(err);
        } else if (!document.physiotherapist){
            err = "No physiotherapist detected.";
            reject(err);
        } else if (!document.patientProfile){
            err = "No patientProfile detected.";
            reject(err);
        } else if (!document.rehabilitationPlan){
            err = "No rehabilitationPlan detected.";
            reject(err);
        } else if (!document.recommendations){
            err = "No recommendations detected.";
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

