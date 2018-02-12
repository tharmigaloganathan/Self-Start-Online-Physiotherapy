var mongoose = require ('mongoose');
var questionsSchema = mongoose.Schema(
    {
        questionText: String,
        helpDescription: String,
        order: Number,
        questionType: {type: mongoose.Schema.ObjectId, ref: ('QuestionType')},
        form: {type: mongoose.Schema.ObjectId, ref: 'Form'}
    }
);

var Questions = module.exports = mongoose.model('Question', questionsSchema);



module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        Questions.findById(id, function (error, document) {
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
        if (!updatedDocument.questionText){
            err = "No questionText detected.";
            reject(err);
        } else if (!updatedDocument.helpDescription){
            err = "No helpDescription detected.";
            reject(err);
        } else if (!updatedDocument.order){
            err = "No order detected.";
            reject(err);
        } else if (!updatedDocument.questionType){
            err = "No questionType detected.";
            reject(err);
        } else if (!updatedDocument.form){
            err = "No form detected.";
            reject(err);
        } else {
            Questions.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.questionText = updatedDocument.questionText;
                    document.helpDescription = updatedDocument.helpDescription;
                    document.order = updatedDocument.order;
                    document.questionType = updatedDocument.questionType;
                    document.form = updatedDocument.form;
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
        Questions.findById(id, function (error, document) {
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
        Questions.find({}, function (error, documents) {
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
        var document = new Questions(object);
        if (!document.questionText){
            err = "No questionText detected.";
            reject(err);
        } else if (!document.helpDescription){
            err = "No helpDescription detected.";
            reject(err);
        } else if (!document.order){
            err = "No order detected.";
            reject(err);
        } else if (!document.questionType){
            err = "No questionType detected.";
            reject(err);
        } else if (!document.form){
            err = "No form detected.";
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


