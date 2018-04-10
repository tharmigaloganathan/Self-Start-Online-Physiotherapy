var mongoose = require('mongoose');
var exercisesSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		objectives: String,
		authorName: String,
		actionSteps: String,
		location: String,
		standard: Boolean,
		frequency: Number,
		duration: Number,
		targetDate: Date,
		multimediaURL: String,
		rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlan')},
		exerciseOrders: {type: mongoose.Schema.ObjectId, ref: ('ExerciseOrder')}
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
        } else if (!updatedDocument.description){
            error = "No description detected.";
            reject(error);
        } else if (!updatedDocument.objectives){
            error = "No objectives detected.";
            reject(error);
        } else if (!updatedDocument.authorName){
            error = "No authorName detected.";
            reject(error);
        } else if (!updatedDocument.actionSteps){
            error = "No actionSteps detected.";
            reject(error);
        } else if (!updatedDocument.location){
            error = "No location detected.";
            reject(error);
        } else if (!updatedDocument.frequency){
            error = "No frequency detected.";
            reject(error);
        } else if (!updatedDocument.duration){
            error = "No duration detected.";
            reject(error);
        } else if (!updatedDocument.targetDate){
            error = "No targetDate detected.";
            reject(error);
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
					document.standard = updatedDocument.standard;
                    document.targetDate = updatedDocument.targetDate;
                    document.multimediaURL = updatedDocument.multimediaURL;
                    document.exerciseOrders = updatedDocument.exerciseOrders;
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
        var document = new Exercises(object);
        if (!document.name){
            error = "No name detected.";
            reject(error);
        } else if (!document.description){
            error = "No description detected.";
            reject(error);
        } else if (!document.objectives){
            error = "No objectives detected.";
            reject(error);
        } else if (!document.authorName){
            error = "No authorName detected.";
            reject(error);
        } else if (!document.actionSteps){
            error = "No actionSteps detected.";
            reject(error);
        } else if (!document.location){
            error = "No location detected.";
            reject(error);
        } else if (!document.frequency){
            error = "No frequency detected.";
            reject(error);
        } else if (!document.duration){
            error = "No duration detected.";
            reject(error);
        } else if (!document.targetDate){
            error = "No targetDate detected.";
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
