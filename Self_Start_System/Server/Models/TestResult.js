var mongoose = require ('mongoose');
var testResultSchema = mongoose.Schema(
    {
        question: String,
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
        if (!updatedDocument.question){
            err = "No question detected.";
            reject(err);
        } else if (!updatedDocument.answer){
            err = "No answer detected.";
            reject(err);
        } else if (!updatedDocument.assessmentTest){
            err = "No assessmentTest detected.";
            reject(err);
        } else {
            TestResults.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.question = updatedDocument.question;
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
        if (!document.question){
            err = "No question detected.";
            reject(err);
        } else if (!document.answer){
            err = "No answer detected.";
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


