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
        if (!updatedDocument.timeStamp){
            error = "No timeStamp detected.";
            reject(error);
        } else if (!updatedDocument.decision){
            error = "No decision detected.";
            reject(error);
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
            error = "No timeStamp detected.";
            reject(error);
        } else if (!document.decision){
            error = "No decision detected.";
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


