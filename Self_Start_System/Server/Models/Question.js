var mongoose = require ('mongoose');
var questionsSchema = mongoose.Schema(
    {
        questionText: String,
        helpDescription: String,
        questionType: {type: mongoose.Schema.ObjectId, ref: ('QuestionType')},
        questionOrders: [{type: mongoose.Schema.ObjectId, ref: 'QuestionOrder'}]
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
        if (!updatedDocument.questionText){
            error = "No questionText detected.";
            reject(error);
        } else if (!updatedDocument.helpDescription){
            error = "No helpDescription detected.";
            reject(error);
        } else {
            Questions.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.questionText = updatedDocument.questionText;
                    document.helpDescription = updatedDocument.helpDescription;
                    document.questionType = updatedDocument.questionType;
                    document.questionOrders = updatedDocument.questionOrders;
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
            error = "No questionText detected.";
            reject(error);
        } else if (!document.helpDescription){
            error = "No helpDescription detected.";
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


