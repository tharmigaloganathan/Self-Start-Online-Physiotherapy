var mongoose = require('mongoose');
var rehabilitationPlansSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		authorName: String,
		goal: String,
		timeFrameToComplete: String,
		exerciseOrders: [{type: mongoose.Schema.ObjectId, ref: ('ExerciseOrder')}],
		assessmentTests: [{type: mongoose.Schema.ObjectId, ref: ('AssessmentTest')}],
		treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatment')}],
        custom: {type: Boolean, default: false}
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
        } else if (!updatedDocument.authorName){
            error = "No authorName detected.";
            reject(error);
        } else if (!updatedDocument.goal){
            error = "No goal detected.";
            reject(error);
        } else if (!updatedDocument.timeFrameToComplete){
            error = "No timeFrameToComplete detected.";
            reject(error);
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
                    document.exerciseOrders = updatedDocument.exerciseOrders;
                    document.assessmentTests = updatedDocument.assessmentTests;
                    document.treatments = updatedDocument.treatments;
                    document.customer = updatedDocument.custom;
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
            error = "No name detected.";
            reject(error);
        } else if (!document.description){
            error = "No description detected.";
            reject(error);
        } else if (!document.authorName){
            error = "No authorName detected.";
            reject(error);
        } else if (!document.goal){
            error = "No goal detected.";
            reject(error);
        } else if (!document.timeFrameToComplete){
            error = "No timeFrameToComplete detected.";
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

