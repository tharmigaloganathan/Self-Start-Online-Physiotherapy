var mongoose = require('mongoose');
var recommendationSchema = mongoose.Schema(
	{
		timeStamp: Date,
		decision: String,
		treatment: {type: mongoose.Schema.ObjectId, ref: ('Treatment')},
    	assessmentTest: {type: mongoose.Schema.ObjectId, ref: ('AssessmentTest')}
	}
);

var Recommendations = module.exports =  mongoose.model('Recommendation', recommendationSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Recommendations.findById(id, function (error, document) {
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
        if (!updatedDocument.timeStamp){
            err = "No timeStamp detected.";
            reject(err);
        } else if (!updatedDocument.decision){
            err = "No decision detected.";
            reject(err);
        } else if (!updatedDocument.treatment){
            err = "No treatment detected.";
            reject(err);
        } else if (!updatedDocument.assessmentTest){
            err = "No assessmentTest detected.";
            reject(err);
        } else {
            Recommendations.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.timeStamp = updatedDocument.timeStamp;
                    document.decision = updatedDocument.decision;
                    document.treatment = updatedDocument.treatment;
                    document.assessmentTest = updatedDocument.assessmentTest;
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
        Recommendations.findById(id, function (error, document) {
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
        Recommendations.find({}, function (error, documents) {
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
        var document = new Recommendations(object);
        if (!document.timeStamp){
            err = "No timeStamp detected.";
            reject(err);
        } else if (!document.decision){
            err = "No decision detected.";
            reject(err);
        } else if (!document.treatment){
            err = "No treatment detected.";
            reject(err);
        } else if (!document.assessmentTest){
            err = "No assessmentTest detected.";
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


