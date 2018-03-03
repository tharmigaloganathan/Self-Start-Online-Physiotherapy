var mongoose = require ('mongoose');
var testResultSchema = mongoose.Schema(
    {
        exercise: String,
        answer: String,
        assessmentTest: {type: mongoose.Schema.ObjectId, ref: 'AssessmentTest'}
    }
);

var TestResults = module.exports = mongoose.model('TestResult', testResultSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        TestResults.findById(id, function (error, document) {
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
        if (!updatedDocument.exercise){
            error = "No exercise detected.";
            reject(error);
        } else if (!updatedDocument.answer){
            error = "No answer detected.";
            reject(error);
        } else {
            TestResults.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.exercise = updatedDocument.exercise;
                    document.answer = updatedDocument.answer;
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
        TestResults.findById(id, function (error, document) {
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
        TestResults.find({}, function (error, documents) {
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
        var document = new TestResults(object);
        if (!document.exercise){
            error = "No exercise detected.";
            reject(error);
        } else if (!document.answer){
            error = "No answer detected.";
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


