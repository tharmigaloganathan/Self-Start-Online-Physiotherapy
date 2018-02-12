var mongoose = require('mongoose');
var rehabilitationPlansSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		authorName: String,
		goal: String,
		timeFrameToComplete: String,
		exercises: [{type: mongoose.Schema.ObjectId, ref: ('Exercise')}],
		assessmentTests: [{type: mongoose.Schema.ObjectId, ref: ('AssessmentTest')}],
		treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatment')}]
	}
);

var RehabilitationPlans = module.exports = mongoose.model('RehabilitationPlan', rehabilitationPlansSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        RehabilitationPlans.findById(id, function (error, document) {
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
        } else if (!updatedDocument.authorName){
            err = "No authorName detected.";
            reject(err);
        } else if (!updatedDocument.goal){
            err = "No goal detected.";
            reject(err);
        } else if (!updatedDocument.timeFrameToComplete){
            err = "No timeFrameToComplete detected.";
            reject(err);
        } else if (!updatedDocument.exercises){
            err = "No exercises detected.";
            reject(err);
        } else if (!updatedDocument.assessmentTests){
            err = "No assessmentTests detected.";
            reject(err);
        } else if (!updatedDocument.treatments){
            err = "No treatments detected.";
            reject(err);
        } else {
            RehabilitationPlans.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.name = updatedDocument.name;
                    document.description = updatedDocument.description;
                    document.authorName = updatedDocument.authorName;
                    document.goal = updatedDocument.goal;
                    document.timeFrameToComplete = updatedDocument.timeFrameToComplete;
                    document.exercises = updatedDocument.exercises;
                    document.assessmentTests = updatedDocument.assessmentTests;
                    document.treatments = updatedDocument.treatments;
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
        RehabilitationPlans.findById(id, function (error, document) {
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
        RehabilitationPlans.find({}, function (error, documents) {
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
        var document = new RehabilitationPlans(object);
        if (!document.name){
            err = "No name detected.";
            reject(err);
        } else if (!document.description){
            err = "No description detected.";
            reject(err);
        } else if (!document.authorName){
            err = "No authorName detected.";
            reject(err);
        } else if (!document.goal){
            err = "No goal detected.";
            reject(err);
        } else if (!document.timeFrameToComplete){
            err = "No timeFrameToComplete detected.";
            reject(err);
        } else if (!document.exercises){
            err = "No exercises detected.";
            reject(err);
        } else if (!document.assessmentTests){
            err = "No assessmentTests detected.";
            reject(err);
        } else if (!document.treatments){
            err = "No treatments detected.";
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

