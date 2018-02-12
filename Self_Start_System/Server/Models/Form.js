var mongoose = require ('mongoose');
var formsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        questions: [{type: mongoose.Schema.ObjectId, ref: 'Question'}],
        administrator: {type: mongoose.Schema.ObjectId, ref: ('Administrator')},
        assessmentTests: [{type: mongoose.Schema.ObjectId, ref: 'AssessmentTest'}]
    }
);

var Forms = module.exports = mongoose.model('Form', formsSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Forms.findById(id, function (error, document) {
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
        } else if (!updatedDocument.questions){
            err = "No questions detected.";
            reject(err);
        } else if (!updatedDocument.administrator){
            err = "No administrator detected.";
            reject(err);
        } else if (!updatedDocument.assessmentTests){
            err = "No assessmentTests detected.";
            reject(err);
        } else {
            Forms.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.name = updatedDocument.name;
                    document.description = updatedDocument.description;
                    document.questions = updatedDocument.questions;
                    document.administrator = updatedDocument.administrator;
                    document.assessmentTests = updatedDocument.assessmentTests;
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
        Forms.findById(id, function (error, document) {
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
        Forms.find({}, function (error, documents) {
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
        var document = new Forms(object);
        if (!document.name){
            err = "No name detected.";
            reject(err);
        } else if (!document.description){
            err = "No description detected.";
            reject(err);
        } else if (!document.questions){
            err = "No questions detected.";
            reject(err);
        } else if (!document.administrator){
            err = "No administrator detected.";
            reject(err);
        } else if (!document.assessmentTests){
            err = "No assessmentTests detected.";
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


