var mongoose = require('mongoose');
var exercisesSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		objectives: String,
		authorName: String,
		actionSteps: String,
		location: String,
		frequency: Number,
		duration: Number,
		targetDate: Date,
		multimediaURL: String,
		rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlan')}
	}
);

var Exercises = module.exports = mongoose.model('Exercise', exercisesSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Exercises.findById(id, function (error, document) {
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
        } else if (!updatedDocument.description){
            err = "No description detected.";
            reject(err);
        } else if (!updatedDocument.objectives){
            err = "No objectives detected.";
            reject(err);
        } else if (!updatedDocument.authorName){
            err = "No authorName detected.";
            reject(err);
        } else if (!updatedDocument.actionSteps){
            err = "No actionSteps detected.";
            reject(err);
        } else if (!updatedDocument.location){
            err = "No location detected.";
            reject(err);
        } else if (!updatedDocument.frequency){
            err = "No frequency detected.";
            reject(err);
        } else if (!updatedDocument.duration){
            err = "No duration detected.";
            reject(err);
        } else if (!updatedDocument.targetDate){
            err = "No targetDate detected.";
            reject(err);
        } else if (!updatedDocument.multimediaURL){
            err = "No multimediaURL detected.";
            reject(err);
        } else if (!updatedDocument.rehabilitationPlan){
            err = "No rehabilitationPlan detected.";
            reject(err);
        } else {
            Exercises.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.name = updatedDocument.name;
                    document.description = updatedDocument.description;
                    document.objectives = updatedDocument.objectives;
                    document.authorName = updatedDocument.authorName;
                    document.actionSteps = updatedDocument.actionSteps;
                    document.location = updatedDocument.location;
                    document.frequency = updatedDocument.frequency;
                    document.duration = updatedDocument.duration;
                    document.targetDate = updatedDocument.targetDate;
                    document.multimediaURL = updatedDocument.multimediaURL;
                    document.rehabilitationPlan = updatedDocument.rehabilitationPlan;
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
        Exercises.findById(id, function (error, document) {
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
        Exercises.find({}, function (error, documents) {
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
        var document = new Administrators(object);
        if (!document.name){
            err = "No name detected.";
            reject(err);
        } else if (!document.description){
            err = "No description detected.";
            reject(err);
        } else if (!document.objectives){
            err = "No objectives detected.";
            reject(err);
        } else if (!document.authorName){
            err = "No authorName detected.";
            reject(err);
        } else if (!document.actionSteps){
            err = "No actionSteps detected.";
            reject(err);
        } else if (!document.location){
            err = "No location detected.";
            reject(err);
        } else if (!document.frequency){
            err = "No frequency detected.";
            reject(err);
        } else if (!document.duration){
            err = "No duration detected.";
            reject(err);
        } else if (!document.targetDate){
            err = "No targetDate detected.";
            reject(err);
        } else if (!document.multimediaURL){
            err = "No multimediaURL detected.";
            reject(err);
        } else if (!document.rehabilitationPlan){
            err = "No rehabilitationPlan detected.";
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


